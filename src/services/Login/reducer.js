import {
  AUTH_USER,
  AUTH_USER_SOCIAL,
  SIGNUP,
  SIGNUP_SOCIAL,
} from './actionType';

const initialState = {
  userInfo: [],
  userID: undefined,
  auth: false,
};

export default function HomeReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, userID: action.payload, auth: true };
    case SIGNUP:
      return { ...state, userID: action.payload, auth: true };
    case AUTH_USER_SOCIAL:
      return { ...state, userID: action.payload, auth: true };
    case SIGNUP_SOCIAL:
      return { ...state, userID: action.payload, auth: true };
    default:
      return state;
  }
}
