import React, { Component } from 'react';
import {
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  View,
  Alert,
  NativeModules,
  TouchableOpacity,
} from 'react-native';

const { RNTwitterSignIn } = NativeModules;

const Constants = {
  //Dev Parse keys
  TWITTER_COMSUMER_KEY: 'eKZpN9dQx4MMd2gwz4FGppnle',
  TWITTER_CONSUMER_SECRET: 'EO3tDMrZhBxCS9rHeTrgwDQJEVzd0BmBKTDmMxb56aGztZfo3e',
};

export default class TwitterButton extends Component {
  state = {
    isLoggedIn: false,
  };

  _twitterSignIn = () => {
    RNTwitterSignIn.init(
      Constants.TWITTER_COMSUMER_KEY,
      Constants.TWITTER_CONSUMER_SECRET,
    );
    RNTwitterSignIn.logIn()
      .then(loginData => {
        console.log(loginData);
        const { authToken, authTokenSecret } = loginData;
        if (authToken && authTokenSecret) {
          this.setState({
            isLoggedIn: true,
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleLogout = () => {
    console.log('logout');
    RNTwitterSignIn.logOut();
    this.setState({
      isLoggedIn: false,
    });
  };

  render() {
    const { isLoggedIn } = this.state;
    return (
      <View style={this.props.style}>
        {isLoggedIn ? (
          <TouchableOpacity onPress={this.handleLogout}>
            <Text>Log out</Text>
          </TouchableOpacity>
        ) : (
          <Button
            name="logo-twitter"
            style={styles.button}
            onPress={this._twitterSignIn}
            title="Login with Twitter"
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1b95e0',
    color: 'white',
    width: 200,
    height: 50,
  },
});
