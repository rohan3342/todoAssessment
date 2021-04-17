import {
  AUTH_USER,
  AUTH_USER_SOCIAL,
  SIGNUP,
  SIGNUP_SOCIAL,
  LOGOUT,
  SET_USERID,
} from './actionType';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  userID: undefined,
  userName: undefined,
};

export default function LoginReducer(state = initialState, action) {
  if (
    action.payload &&
    (action.type === 'AUTH_USER' ||
      action.type === 'SIGNUP' ||
      action.type === 'AUTH_USER_SOCIAL' ||
      action.type === 'SIGNUP_SOCIAL')
  ) {
    const { id, name } = action.payload;
    storeData(id, name);
  }

  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        userID: action.payload.id,
        userName: action.payload.name,
      };
    case SIGNUP:
      return {
        ...state,
        userID: action.payload.id,
        userName: action.payload.name,
      };
    case AUTH_USER_SOCIAL:
      return {
        ...state,
        userID: action.payload.id,
        userName: action.payload.name,
      };
    case SIGNUP_SOCIAL:
      return {
        ...state,
        userID: action.payload.id,
        userName: action.payload.name,
      };
    case LOGOUT:
      return { userID: undefined };
    case SET_USERID:
      return { userID: action.payload };
    default:
      return state;
  }
}

const storeData = async (userID, userName) => {
  try {
    await AsyncStorage.multiSet([
      ['@user_id', userID.toString()],
      ['@user_name', userName.toString()],
    ]);
    console.log('UserID Stored In AsyncStorage');
  } catch (e) {
    console.log('AsyncStorage: HomeReducer =>', e);
  }
};
