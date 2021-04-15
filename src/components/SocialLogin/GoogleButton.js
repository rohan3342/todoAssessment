import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import AntDesign from 'react-native-vector-icons/AntDesign';

GoogleSignin.configure({
  iosClientId:
    '1045411016809-kjlahngbat65kqaj9tojd9nmturj45lu.apps.googleusercontent.com',
});

const GoogleLoginButton = ({ callback }) => {
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const userData = {
        username: userInfo.user.email,
        name: userInfo.user.name,
        phone: 9999999999,
        socialId: userInfo.user.id,
        password: userInfo.user.id,
      };
      callback(userData);
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
      <AntDesign name="googleplus" color="white" size={35} />
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
      <AntDesign name="googleplus" color="white" size={35} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DB4437',
    padding: 10,
    borderRadius: 50,
  },
});

export { GoogleLoginButton, GoogleLogoutButton };
