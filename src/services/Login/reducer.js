import {
  AUTH_USER,
  AUTH_USER_SOCIAL,
  SIGNUP,
  SIGNUP_SOCIAL,
  LOGOUT,
} from './actionType';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  userID: undefined,
};

export default function LoginReducer(state = initialState, action) {
  if (
    action.payload &&
    (action.type === 'AUTH_USER' ||
      action.type === 'SIGNUP' ||
      action.type === 'AUTH_USER_SOCIAL' ||
      action.type === 'SIGNUP_SOCIAL')
  ) {
    const userID = action.payload;
    storeData(userID);
  }

  switch (action.type) {
    case AUTH_USER:
      return { ...state, userID: action.payload };
    case SIGNUP:
      return { ...state, userID: action.payload };
    case AUTH_USER_SOCIAL:
      return { ...state, userID: action.payload };
    case SIGNUP_SOCIAL:
      return { ...state, userID: action.payload };
    case LOGOUT:
      return { userID: undefined };
    default:
      return state;
  }
}

const storeData = async userID => {
  try {
    await AsyncStorage.setItem('@user_id', userID.toString());
    console.log('UserID Stored In AsyncStorage');
  } catch (e) {
    console.log('AsyncStorage: HomeReducer =>', e);
  }
};
