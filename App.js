import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Routes from './src/routes/Routes';
class App extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Routes />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
