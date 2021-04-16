import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import NotesScreen from '../screens/NotesScreen';
import MenuScreen from '../screens/MenuScreen';
import AddNoteScreen from '../screens/AddNoteScreen';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        keyboardHandlingEnabled
        mode="card"
        initialRouteName="LoginScreen"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="NotesScreen" component={NotesScreen} />
        <Stack.Screen name="MenuScreen" component={MenuScreen} />
        <Stack.Screen name="AddNoteScreen" component={AddNoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
