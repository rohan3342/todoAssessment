import {
  AUTH_USER,
  AUTH_USER_SOCIAL,
  SIGNUP,
  SIGNUP_SOCIAL,
} from './actionType';
import { URL, USERS, AUTHENTICATE } from '../constant';

export const signUp = (userInfo, callback) => async dispatch => {
  const { username, password, phone } = userInfo;
  const response = await fetch(`${URL + USERS}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
      name: username,
      phone,
      socialId: null,
    }),
  });
  const { status, body, message } = await response.json();

  if (status) {
    callback(status);
    dispatch({
      type: SIGNUP,
      payload: body.id,
    });
  } else {
    callback(message);
  }
};

export const authUserSocial = (socialId, callback) => async dispatch => {
  const response = await fetch(`${URL + AUTHENTICATE}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ socialId }),
  });
  const { status, id } = await response.json();

  if (status) {
    callback(status);
    dispatch({
      type: AUTH_USER_SOCIAL,
      payload: id,
    });
  } else {
    callback(status);
  }
};

export const signUpSocial = (userInfo, callback) => async dispatch => {
  const { username, name, password, phone, socialId } = userInfo;
  const response = await fetch(`${URL + USERS}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
      name,
      phone,
      socialId,
    }),
  });
  const { status, body, message } = await response.json();

  if (status) {
    callback(status);
    dispatch({
      type: SIGNUP_SOCIAL,
      payload: body.id,
    });
  } else {
    callback(message);
  }
};

export const authUser = (userInfo, callback) => async dispatch => {
  const { username, password } = userInfo;
  const response = await fetch(`${URL + AUTHENTICATE}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const { status, id, message } = await response.json();

  if (status) {
    callback(status);
    dispatch({
      type: AUTH_USER,
      payload: id,
    });
  } else {
    callback(message);
  }
};
