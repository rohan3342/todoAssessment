import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Platform } from 'react-native';
import { connect } from 'react-redux';
import Routes from './src/routes/Routes';
class App extends Component {
  render() {
    const dark = this.props.darkTheme;
    if (dark) {
      StatusBar.setBarStyle('light-content');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('#262626');
        StatusBar.setTranslucent(true);
      }
    } else {
      StatusBar.setBarStyle('dark-content');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('#fff');
        StatusBar.setTranslucent(true);
      }
    }

    return (
      <SafeAreaView style={[styles.container, dark && darkTheme.conatiner]}>
        <Routes />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    ...Platform.select({
      android: {
        paddingTop: 40,
      },
    }),
  },
});
const darkTheme = StyleSheet.create({
  conatiner: {
    backgroundColor: '#262626',
  },
});

const mapStateToProps = state => ({
  darkTheme: state.home.darkTheme,
});

export default connect(mapStateToProps)(App);
