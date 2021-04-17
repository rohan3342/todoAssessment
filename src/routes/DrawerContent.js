import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { logOut } from '../services/Login/action';
import { useDispatch, useSelector } from 'react-redux';
import {
  TOGGLE_THEME,
  RESET_THEME_ON_LOGOUT,
} from '../services/Home/actionType';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function DrawerContent(props) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [isEnable, setIsEnable] = useState(false);
  const dark = useSelector(state => state.home.darkTheme);

  const isOn = () => {
    toggleTheme();
    setIsEnable(prevState => !prevState);
  };

  const signOut = () => {
    console.log('SignOut: DrawerContent');
    dispatch(logOut());
    dispatch({
      type: RESET_THEME_ON_LOGOUT,
    });
    props.navigation.navigate('LoginScreen');
  };

  const toggleTheme = () => {
    dispatch({
      type: TOGGLE_THEME,
    });
  };

  useEffect(() => {
    (async function getData() {
      try {
        const user_name = await AsyncStorage.getItem('@user_name');
        setUsername(user_name);
      } catch (e) {
        console.log('AsyncStorage: HomeReducer =>', e);
      }
    })();
  });

  return (
    <View style={[styles.container, dark && darkTheme.container]}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <View style={styles.avatarView}>
            <Avatar.Image
              source={{
                uri: 'https://source.unsplash.com/1600x900/?man,woman',
              }}
              size={120}
            />
          </View>
          <View style={styles.userInfoView}>
            <Text style={[styles.title, dark && darkTheme.title]}>
              {username}
            </Text>
          </View>
        </View>

        <View style={[styles.preference, dark && darkTheme.preference]}>
          <Text style={[styles.preferenceTxt, dark && darkTheme.preferenceTxt]}>
            Dark Theme
          </Text>
          <View>
            <Switch
              style={styles.switch}
              trackColor={{ true: '#383972' }}
              thumbColor={isEnable ? '#fff' : '#ccc'}
              onValueChange={isOn}
              value={isEnable}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => signOut()}
        style={[
          styles.bottomDrawerSection,
          dark && darkTheme.bottomDrawerSection,
        ]}>
        <Icon name="logout" color={dark ? '#e05043' : '#E62D1D'} size={30} />
        <Text style={[styles.logoutText, dark && darkTheme.logoutText]}>
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatarView: {
    flexDirection: 'row',
    marginTop: 15,
  },
  title: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#383972',
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    paddingVertical: 10,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  logoutText: {
    fontSize: 20,
    color: '#E62D1D',
    marginLeft: 10,
  },
  preference: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  preferenceTxt: {
    fontSize: 18,
    fontWeight: '600',
    color: '#383972',
  },
});

const darkTheme = StyleSheet.create({
  container: {
    backgroundColor: '#262626',
  },
  title: {
    color: '#fff',
  },
  preferenceTxt: {
    color: '#fff',
  },
  logoutText: {
    color: '#e05043',
  },
  bottomDrawerSection: {
    borderTopColor: 'grey',
    borderBottomColor: 'grey',
  },
  preference: {
    borderTopColor: 'grey',
    borderBottomColor: 'grey',
  },
});
