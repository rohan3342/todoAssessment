import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { connect } from 'react-redux';
import { getAllNotes } from '../services/Home/action';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import NotesScreen from '../screens/NotesScreen';
import MenuScreen from '../screens/MenuScreen';
import AddNoteScreen from '../screens/AddNoteScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { DrawerContent } from './DrawerContent';
const Drawer = createDrawerNavigator();
class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmpty: true,
      isLoaded: false,
    };
    this.checkStorage();
  }
  checkStorage = async () => {
    const data = await AsyncStorage.getItem('@user_id');
    if (data !== null) {
      console.log(data);
      this.props.getAllNotes(data);
      this.setState({ isEmpty: false, isLoaded: true });
    } else {
      this.setState({ isLoaded: true });
    }
  };

  render() {
    const { isEmpty, isLoaded } = this.state;
    return (
      <NavigationContainer>
        {isLoaded ? (
          <Drawer.Navigator
            drawerContent={props => <DrawerContent {...props} />}
            keyboardHandlingEnabled
            mode="card"
            initialRouteName={isEmpty ? 'LoginScreen' : 'MenuScreen'}
            screenOptions={{ headerShown: false }}>
            <Drawer.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{
                gestureEnabled: false,
              }}
            />
            <Drawer.Screen
              options={{
                gestureEnabled: false,
              }}
              name="SignUpScreen"
              component={SignUpScreen}
            />
            <Drawer.Screen name="MenuScreen" component={MenuScreen} />
            <Drawer.Screen name="NotesScreen" component={NotesScreen} />
            <Drawer.Screen name="AddNoteScreen" component={AddNoteScreen} />
          </Drawer.Navigator>
        ) : (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#E62D1D" />
          </View>
        )}
      </NavigationContainer>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getAllNotes: value => dispatch(getAllNotes(value)),
});

export default connect(null, mapDispatchToProps)(Routes);

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
