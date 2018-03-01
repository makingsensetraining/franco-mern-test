import { push } from "react-router-redux";
import * as types from "./actionTypes";
import { showModalSuccess } from "./modalActions";
import { showAlertSuccess, hideAlertSuccess } from "./alertActions";
import userService from "../services/userService";

export function loginAction(email, password, errorCallback) {
  return () => {
    userService.login(email, password, errorCallback);
  };
}

export function loginSuccess(user) {
  return {
    type: types.LOGIN_SUCCESS,
    user: user
  };
}

export function loginFailed(error) {
  return {
    type: types.LOGIN_FAILED,
    error
  };
}

export function logout() {
  return {
    type: types.LOGOUT
  };
}

export function loadUserSuccess(users) {
  return {
    type: types.LOAD_USER_SUCCESS,
    users
  };
}

export function getUserSuccess(user) {
  return {
    type: types.GET_USER_SUCCESS,
    user
  };
}

export function savingUser(status = true) {
  return {
    type: types.SAVING_USER,
    savingUser: status
  };
}

export function createUserSuccess(user) {
  return {
    type: types.CREATE_USER_SUCCESS,
    user
  };
}

export function updateUserSuccess(user) {
  return {
    type: types.UPDATE_USER_SUCCESS,
    user
  };
}

export function requestUserId(userId) {
  return dispatch => {
    dispatch({
      type: types.REQUEST_USER_ID,
      userToDelete: userId
    });
    dispatch(showModalSuccess("userDeleteModal"));
  };
}

export function deleteUserSuccess(userId) {
  return {
    type: types.DELETE_USER_SUCCESS,
    userId
  };
}

export function loadUsers() {
  return dispatch => {
    dispatch(hideAlertSuccess());
    return userService
      .loadUsers()
      .then(data => dispatch(loadUserSuccess(data)))
      .catch(error => dispatch(showAlertSuccess(error.description, "error")));
  };
}

export function getUser(id, showUserDetails = false) {
  return dispatch => {
    dispatch(hideAlertSuccess());
    return userService
      .get(id)
      .then(user => {
        dispatch(getUserSuccess(user));
        if (showUserDetails) {
          dispatch(showModalSuccess("userDetailsModal"));
        }
      })
      .catch(error => dispatch(showAlertSuccess(error.description, "error")));
  };
}

export function createUser(user) {
  return dispatch => {
    dispatch(hideAlertSuccess());
    dispatch(savingUser());
    return userService
      .create(user)
      .then(createdUser => {
        const user = {
          id: createdUser.userId,
          name: createdUser.name,
          email: createdUser.email,
          createdAt: new Date().toISOString()
        };
        dispatch(createUserSuccess(user));
        dispatch(savingUser(false));
        dispatch(showAlertSuccess("User created successfully", "success"));
        dispatch(push("/app/users"));
      })
      .catch(error => {
        dispatch(savingUser(false));
        dispatch(showAlertSuccess(error.code, "error"));
      });
  };
}

export function updateUser(user) {
  return dispatch => {
    dispatch(hideAlertSuccess());
    dispatch(savingUser());
    return userService
      .update(user)
      .then(updatedUser => {
        dispatch(updateUserSuccess(updatedUser));
        dispatch(savingUser(false));
        dispatch(showAlertSuccess("User updated successfully", "success"));
        dispatch(push("/app/users"));
      })
      .catch(error => {
        dispatch(savingUser(false));
        dispatch(showAlertSuccess(error.description, "error"));
      });
  };
}

export function deleteUser(id) {
  return dispatch => {
    dispatch(hideAlertSuccess());
    dispatch(showAlertSuccess("Removing user...", "info"));
    return userService
      .delete(id)
      .then(() => {
        dispatch(deleteUserSuccess(id));
        dispatch(hideAlertSuccess());
        dispatch(showAlertSuccess("User removed", "success"));
      })
      .catch(error => dispatch(showAlertSuccess(error.description, "error")));
  };
}
