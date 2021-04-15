import { AUTH_USER, AUTH_USER_SOCIAL, SIGNUP } from './actionType';

const initialState = {
  userInfo: [],
  userID: undefined,
  auth: false,
};

export default function HomeReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP:
      return { ...state, userID: action.payload, auth: true };
    default:
      return state;
  }
}
