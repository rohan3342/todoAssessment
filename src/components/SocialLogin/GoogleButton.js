import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  iosClientId:
    '1045411016809-kjlahngbat65kqaj9tojd9nmturj45lu.apps.googleusercontent.com',
});

const GoogleLoginButton = () => {
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('Google Login', userInfo);
      // Dispatch Action
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('SIGN_IN_CANCELLED:', error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('IN_PROGRESS:', error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('PLAY_SERVICES_NOT_AVAILABLE:', error);
      } else {
        console.log('Error:', error);
      }
    }
  };

  return (
    <TouchableOpacity onPress={signIn} style={styles.container}>
      <Text>Login</Text>
    </TouchableOpacity>
  );
};

const GoogleLogoutButton = () => {
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      console.log('signOut(): REVOKE_ACCESS \nsignOut: SIGN_OUT');
      // Dispatch Action
    } catch (error) {
      console.log('signOut(): ', error);
    }
  };

  return (
    <TouchableOpacity onPress={signOut} style={styles.container}>
      <Text>Logout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { GoogleLoginButton, GoogleLogoutButton };
