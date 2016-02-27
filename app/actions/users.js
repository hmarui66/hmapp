import { fetchGet, fetchPost } from 'lib/fetch';

import * as types from 'constants/actionTypes';

// Log In Action Creators
function beginLogin() {
  return { type: types.MANUAL_LOGIN_USER };
}

function loginSuccess() {
  return { type: types.LOGIN_SUCCESS_USER };
}

function loginError() {
  return { type: types.LOGIN_ERROR_USER };
}

// Sign Up Action Creators
function signUpError() {
  return { type: types.SIGNUP_ERROR_USER };
}

function beginSignUp() {
  return { type: types.SIGNUP_USER };
}

function signUpSuccess() {
  return { type: types.SIGNUP_SUCCESS_USER };
}

// Log Out Action Creators
function beginLogout() {
  return { type: types.LOGOUT_USER};
}

function logoutSuccess() {
  return { type: types.LOGOUT_SUCCESS_USER};
}

function logoutError() {
  return { type: types.LOGOUT_ERROR_USER};
}

export function manualLogin(data) {
  return dispatch => {
    dispatch(beginLogin());

    return fetchPost('api/login', data).then(res => {
      const action = res.status === 200 ? loginSuccess : loginError;
      return dispatch(action());
    }).catch(error => {
      throw new Error(error.message);
    });
  };
}

export function signUp(data) {
  return dispatch => {
    dispatch(beginSignUp());

    return fetchPost('api/signup', data).then(res => {
      const action = res.status === 200 ? signUpSuccess : signUpError;
      return dispatch(action());
    }).catch(error => {
      throw new Error(error.message);
    });
  };
}

export function logOut() {
  return dispatch => {
    dispatch(beginLogout());

    fetchGet('api/logout').then(res => {
      const action = res.status === 200 ? logoutSuccess : logoutError;
      return dispatch(action());
    }).catch(error => {
      throw new Error(error.message);
    });
  };
}

