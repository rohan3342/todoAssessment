/* ActionTypes */
export const AUTH_USER = 'AUTH_USER'; // To Login User using Username & Password
export const AUTH_USER_SOCIAL = 'AUTH_USER_SOCIAL';
/*
  To Signup/Login Users with Social Login
  Authenticate User using Social ID, if the SocialId received does not exist, will send a POST request to generate a new user.
*/
export const SIGNUP_SOCIAL = 'SIGNUP_SOCIAL'; // SIGNUP_SOCIAL

export const SIGNUP = 'SIGNUP'; // Simple Sign UP
