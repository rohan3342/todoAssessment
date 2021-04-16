/* ActionTypes */
// To Login User using Username & Password
export const AUTH_USER = 'AUTH_USER';
/*
  AUTH_USER_SOCIAL & SIGNUP_SOCIAL
  To Autheticate/SignUp Users with Social Login.
  Authenticate User using Social ID, if the SocialId received does not exist, will send a POST request to generate a new user using SIGNUP_SOCIAL.
*/
export const AUTH_USER_SOCIAL = 'AUTH_USER_SOCIAL';
export const SIGNUP_SOCIAL = 'SIGNUP_SOCIAL';

// To SignUp with Social ID
export const SIGNUP = 'SIGNUP';

// To Logout
export const LOGOUT = 'LOGOUT';
