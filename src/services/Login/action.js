import { AUTH_USER, AUTH_USER_SOCIAL, SIGNUP } from './actionType';
import { URL, USERS, AUTHENTICATE, NOTES } from '../constant';

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
