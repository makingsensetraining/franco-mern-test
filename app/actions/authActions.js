import { LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from './actionTypes';
import authService from '../services/authService';

export function loginAction(email, password, errorCallback) {
  return dispatch => {
    authService.login(email, password, errorCallback);
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user: user,
  };
}

export function loginFailed(error) {
  return {
    type: LOGIN_FAILED,
    error,
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}
