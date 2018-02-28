import fetch from "isomorphic-fetch";
import auth0 from "auth0-js";
import * as endpoints from "./apiEndpoints";

function buildRequest(url, options) {
  if (options.needCredentials === undefined) options.needCredentials = true;

  if (options.needCredentials) {
    const { idToken } = JSON.parse(localStorage.getItem("auth"));
    options.headers = Object.assign({}, options.headers, {
      Authorization: `Bearer ${idToken}`
    });
  }

  return new Request(url, options);
}

function buildAuth0Request(url, options) {
  if (options.needCredentials === undefined) options.needCredentials = true;

  if (options.needCredentials) {
    const { accessToken } = JSON.parse(localStorage.getItem("auth"));
    options.headers = Object.assign({}, options.headers, {
      Authorization: `Bearer ${accessToken}`
    });
  }

  return new Request(url, options);
}

class UserService {
  constructor() {
    this.webAuth = new auth0.WebAuth({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENTID,
      responseType: "id_token token",
      redirectUri: process.env.AUTH0_REDIRECT_URI
    });
  }

  login(email, password, errorCallback = null) {
    this.webAuth.login(
      {
        email,
        password,
        realm: process.env.AUTH0_CONNECTION_REALM
      },
      errorCallback
    );
  }

  logout() {
    this.webAuth.logout({
      clientID: process.env.AUTH0_CLIENTID,
      returnTo: process.env.AUTH0_LOGOUT_RETURN_TO
    });
    localStorage.removeItem("auth");
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.webAuth.parseHash(function(err, authResult) {
        if (err) {
          reject(err);
        }
        if (authResult && authResult.accessToken && authResult.idToken) {
          const { accessToken, idToken, expiresIn } = authResult;
          const expiresAt = JSON.stringify(
            expiresIn * 1000 + new Date().getTime()
          );
          localStorage.setItem(
            "auth",
            JSON.stringify({ accessToken, idToken, expiresAt })
          );
          resolve(authResult);
        } else {
          resolve(null);
        }
      });
    });
  }

  isAuthenticated() {
    const auth = JSON.parse(localStorage.getItem("auth"));

    return auth && new Date().getTime() < auth.expiresAt;
  }

  loadUsers() {
    const request = buildRequest(
      `${endpoints.BASE_URL}${endpoints.GET_USERS}`,
      {
        method: "GET"
      }
    );

    return fetch(request).then(response => response.json());
  }

  get(id) {
    const request = buildRequest(
      `${endpoints.BASE_URL}${endpoints.GET_USER}/${id}`,
      {
        method: "GET"
      }
    );

    return fetch(request).then(response => response.json());
  }

  /**
   *
   * @param user Object
   * @returns {Promise<any>}
   */
  create(user) {
    const { name, ...rest } = user;

    return new Promise((resolve, reject) => {
      this.webAuth.signup(
        {
          ...rest,
          user_metadata: { name },
          connection: process.env.AUTH0_CONNECTION_REALM
        },
        (err, response) => {
          if (err) reject(err);

          resolve(response);
        }
      );
    });
  }

  update(user) {
    const request = buildRequest(
      `${endpoints.BASE_URL}${endpoints.PUT_USER}/${user.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user: user
        })
      }
    );

    return fetch(request).then(response => response.json());
  }

  delete(id) {
    const request = buildRequest(
      `${endpoints.BASE_URL}${endpoints.DELETE_USER}/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id
        })
      }
    );

    return fetch(request).then(response => response.json());
  }
}

export default new UserService();
