import {
  AUTH_USER,
  AUTH_USER_SOCIAL,
  SIGNUP,
  SIGNUP_SOCIAL,
} from './actionType';

const initialState = {
  userID: undefined,
};

export default function HomeReducer(state = initialState, action) {
  // if (action.payload) {
  //   //Async Storage
  // }
  switch (action.type) {
    case AUTH_USER:
      return { ...state, userID: action.payload };
    case SIGNUP:
      return { ...state, userID: action.payload };
    case AUTH_USER_SOCIAL:
      return { ...state, userID: action.payload };
    case SIGNUP_SOCIAL:
      return { ...state, userID: action.payload };
    default:
      return state;
  }
}
