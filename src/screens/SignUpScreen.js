import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { signUp } from '../services/Login/action';
import { connect } from 'react-redux';

class SignUpScreen extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    rePassword: '',
    phone: '',
  };

  getUserName = text => this.setState({ username: text });
  getPassword = text => this.setState({ password: text });
  getEmail = text => this.setState({ email: text });
  getrePassword = text => this.setState({ rePassword: text });
  getPhone = text => this.setState({ phone: text });

  validateText = () => {
    const { username, password, email, rePassword, phone } = this.state;
    let passCheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    // Password must have at least one number and at least one special character.
    let usernameCheck = /^[a-z0-9_-]{4,16}$/;
    // Alphanumeric string that may include _ and – having a length of 3 to 16 characters.
    let phonenoCheck = /^(\+)?([ 0-9]){10,16}$/;
    let emailCheck = /(.+)@(.+){2,}\.(.+){2,}/;

    if (username === '') {
      Alert.alert('Empty Username', 'Please Fill the Username');
    } else if (password === '') {
      Alert.alert('Empty Password', 'Please Fill the Password');
    } else if (email === '') {
      Alert.alert('Empty Email', 'Please Fill the Email');
    } else if (rePassword === '') {
      Alert.alert('Empty Repeat-Password', 'Please Fill the Repeat-Password');
    } else if (phone === '') {
      Alert.alert('Empty Phone', 'Please Fill the Phone');
    } else if (!usernameCheck.test(username)) {
      Alert.alert(
        'Username',
        'Username may include _ and – having a length of 4 to 16 characters.',
      );
    } else if (!emailCheck.test(email)) {
      Alert.alert('Email', 'Invalid Email, Email must have @.');
    } else if (!phonenoCheck.test(phone)) {
      Alert.alert('Phone', 'Phone Number must have + 91, Ex +91 9999999999');
    } else if (!passCheck.test(password)) {
      Alert.alert(
        'Password',
        'Password must have at least one number and at least one special character.',
      );
    } else if (!passCheck.test(rePassword)) {
      Alert.alert(
        'Repeat Password',
        'Password must have at least one number and at least one special character.',
      );
    } else if (password !== rePassword) {
      Alert.alert('Password', 'Repeat Password does not match your password');
    } else {
      this.signUp();
      this.setState({
        username: '',
        password: '',
        email: '',
        rePassword: '',
        phone: '',
      });
    }
  };

  signUp = () => {
    const data = this.state;
    const callback = message => {
      console.log(typeof message);
      if (message === true) {
        this.props.navigation.navigate('MenuScreen');
      } else {
        Alert.alert('Error', message, [{ text: 'Close', style: 'cancel' }]);
      }
    };
    this.props.signUp(data, callback);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTxt}>Sign Up</Text>
          <TouchableOpacity
            style={styles.gotoSign}
            onPress={() => this.props.navigation.navigate('LoginScreen')}>
            <Text style={styles.gotoSignTxt}>Login</Text>
          </TouchableOpacity>
        </View>
        <CustomTextInput
          placeholder="Email Address"
          keyboardType="email-address"
          getInput={text => this.getEmail(text)}
        />
        <CustomTextInput
          placeholder="Username"
          keyboardType="default"
          getInput={text => this.getUserName(text)}
        />
        <CustomTextInput
          placeholder="Phone Number"
          keyboardType="number-pad"
          getInput={text => this.getPhone(text)}
        />
        <CustomTextInput
          placeholder="Password"
          keyboardType="default"
          secureTextEntry={true}
          type="password"
          getInput={text => this.getPassword(text)}
        />
        <CustomTextInput
          placeholder="Repeat Password"
          keyboardType="default"
          secureTextEntry={true}
          type="password"
          getInput={text => this.getrePassword(text)}
        />
        <TouchableOpacity
          onPress={() => this.validateText()}
          style={styles.LoginBtn}>
          <Ionicons
            style={styles.LoginBtnIcon}
            name="ios-checkmark"
            size={30}
            color="blue"
          />
          <Text style={styles.LoginBtnTxt}>SIGN UP</Text>
        </TouchableOpacity>
        <View style={styles.termsView}>
          <Text style={styles.termsViewTxt}>Terms of Service</Text>
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
  termsView: {
    marginTop: 10,
  },
  termsViewTxt: {
    color: 'grey',
    textAlign: 'center',
    fontSize: 18,
  },
});

const mapDispatchToProps = dispatch => ({
  signUp: (value, callback) => dispatch(signUp(value, callback)),
});

export default connect(null, mapDispatchToProps)(SignUpScreen);
