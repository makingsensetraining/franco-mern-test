import auth0 from 'auth0-js';

class AuthService {
  constructor() {
    this.webAuth = new auth0.WebAuth({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENTID,
      responseType: 'id_token token',
      redirectUri: process.env.AUTH0_REDIRECT_URI,
    });
  }

  login(email, password, errorCallback = null) {
    this.webAuth.login({
      email,
      password,
      realm: process.env.AUTH0_CONNECTION_REALM,
    }, errorCallback);
  }

  logout() {
    this.webAuth.logout({
      clientID: process.env.AUTH0_CLIENTID,
      returnTo: process.env.AUTH0_LOGOUT_RETURN_TO
    });
    localStorage.removeItem('auth');
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.webAuth.parseHash(function(err, authResult) {
        if (err) {
          reject(err);
        }
        if (authResult && authResult.accessToken && authResult.idToken) {
          const {accessToken, idToken, expiresIn} = authResult;
          const expiresAt = JSON.stringify((expiresIn * 1000) + new Date().getTime());
          localStorage.setItem('auth', JSON.stringify({accessToken, idToken, expiresAt}));
          resolve(authResult);
        } else {
          resolve(null);
        }
      });
    });
  }

  isAuthenticated() {
    const auth = JSON.parse(localStorage.getItem('auth'));

    return auth && new Date().getTime() < auth.expiresAt;
  }
}

export default new AuthService();
