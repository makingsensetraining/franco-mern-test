import auth0 from 'auth0-js';

class AuthService {
  constructor() {
    this.webAuth = new auth0.WebAuth({
      domain: "makingsense-mern-seed.auth0.com",
      clientID: "cpdl0E7zSsp7HujafhA7Fyw4HsjmrVsc",
      responseType: 'id_token token',
      redirectUri: "http://localhost:3000/callback",
    });
  }

  login(email, password, errorCallback = null) {
    this.webAuth.login({
      email,
      password,
      realm: "Username-Password-Authentication",
    }, errorCallback);
  }

  logout() {
    this.webAuth.logout({
      clientID: "cpdl0E7zSsp7HujafhA7Fyw4HsjmrVsc",
      returnTo: 'http://localhost:3000/'
    });
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.webAuth.parseHash(function(err, authResult) {
        if (err) {
          reject(err);
        }
        if (authResult && authResult.accessToken && authResult.idToken) {
          resolve(authResult);
        } else {
          resolve(null);
        }
      });
    });
  }
}

export default new AuthService();
