import React from 'react';
import { StyleSheet, NativeModules, TouchableOpacity } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

const { RNTwitterSignIn } = NativeModules;

const Constants = {
  TWITTER_COMSUMER_KEY: 'eKZpN9dQx4MMd2gwz4FGppnle',
  TWITTER_CONSUMER_SECRET: 'EO3tDMrZhBxCS9rHeTrgwDQJEVzd0BmBKTDmMxb56aGztZfo3e',
};

const TwitterLoginButton = () => {
  const twitterSignIn = () => {
    RNTwitterSignIn.init(
      Constants.TWITTER_COMSUMER_KEY,
      Constants.TWITTER_CONSUMER_SECRET,
    );

    RNTwitterSignIn.logIn()
      .then(userInfo => {
        const { authToken, authTokenSecret } = userInfo;
        authToken && authTokenSecret && console.log('Twitter Login', userInfo); // && Action Dispatch
      })
      .catch(error => console.log(error));
  };

  return (
    <TouchableOpacity style={styles.container} onPress={twitterSignIn}>
      <AntDesign name="twitter" size={35} color="white" />
    </TouchableOpacity>
  );
};

const TwitterLogoutButton = () => {
  const handleLogout = () => {
    console.log('Twitter Logout');
    RNTwitterSignIn.logOut();
    //Dispatch Action
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleLogout}>
      <AntDesign name="twitter" size={35} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    padding: 10,
    backgroundColor: '#1DA1F2',
  },
});

export { TwitterLoginButton, TwitterLogoutButton };
