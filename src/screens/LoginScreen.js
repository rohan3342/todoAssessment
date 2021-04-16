import React, { Component } from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GoogleLoginButton } from '../components/SocialLogin/GoogleButton';
import { TwitterLoginButton } from '../components/SocialLogin/TwitterButton';
import {
  authUserSocial,
  signUpSocial,
  authUser,
} from '../services/Login/action';
import { connect } from 'react-redux';

class LoginScreen extends Component {
  state = {
    username: '',
    password: '',
  };

  getUserName = text => this.setState({ username: text });
  getPassword = text => this.setState({ password: text });

  socialCallBack = async userInfo => {
    const authUserSocialCallback = AuthStatus => {
      const signUpSocialCallback = SignStatus => {
        SignStatus && this.props.navigation.navigate('MenuScreen');
      };
      if (AuthStatus === true) {
        this.props.navigation.navigate('MenuScreen');
      } else {
        this.props.signUpSocial(userInfo, signUpSocialCallback);
      }
    };
    this.props.authUserSocial(userInfo.socialId, authUserSocialCallback);
  };

  Login = async () => {
    const userInfo = this.state;
    console.log(userInfo);
    const loginCallBack = message => {
      if (message === true) {
        this.props.navigation.navigate('MenuScreen');
      } else {
        Alert.alert('Error', message, [{ text: 'Close', style: 'cancel' }]);
      }
    };
    this.props.authUser(userInfo, loginCallBack);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTxt}>Login</Text>
          <TouchableOpacity
            style={styles.gotoSign}
            onPress={() => this.props.navigation.navigate('SignUpScreen')}>
            <Text style={styles.gotoSignTxt}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <CustomTextInput
          placeholder="Username or Email Address"
          keyboardType="default"
          getInput={text => this.getUserName(text)}
        />
        <CustomTextInput
          placeholder="Password"
          keyboardType="default"
          secureTextEntry={true}
          type="password"
          getInput={text => this.getPassword(text)}
        />
        <TouchableOpacity onPress={() => this.Login()} style={styles.LoginBtn}>
          <Ionicons
            style={styles.LoginBtnIcon}
            name="ios-checkmark"
            size={30}
            color="blue"
          />
          <Text style={styles.LoginBtnTxt}>LOG IN</Text>
        </TouchableOpacity>
        <View style={styles.socialView}>
          <Text style={styles.socialViewTxt}>Login With</Text>
          <View style={styles.socialBtnView}>
            <GoogleLoginButton callback={value => this.socialCallBack(value)} />
            <TwitterLoginButton
              callback={value => this.socialCallBack(value)}
            />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: 'white',
  },
  header: {
    marginVertical: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTxt: {
    fontSize: 30,
    fontWeight: '500',
  },
  gotoSign: {},
  gotoSignTxt: {
    color: '#aaa',
    fontSize: 20,
    fontWeight: '500',
  },
  LoginBtn: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
    marginVertical: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'blue',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  LoginBtnTxt: {
    fontSize: 20,
    color: 'blue',
    letterSpacing: 1.3,
  },
  LoginBtnIcon: {
    marginRight: 10,
  },
  socialView: {
    alignItems: 'center',
  },
  socialViewTxt: {
    color: 'grey',
    fontSize: 18,
    marginBottom: 20,
  },
  socialBtnView: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

const mapDispatchToProps = dispatch => ({
  authUserSocial: (value, callback) =>
    dispatch(authUserSocial(value, callback)),
  signUpSocial: (value, callback) => dispatch(signUpSocial(value, callback)),
  authUser: (value, callback) => dispatch(authUser(value, callback)),
});

export default connect(null, mapDispatchToProps)(LoginScreen);
