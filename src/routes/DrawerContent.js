import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { logOut } from '../services/Login/action';
import { useDispatch } from 'react-redux';
import {
  TOGGLE_THEME,
  RESET_THEME_ON_LOGOUT,
} from '../services/Home/actionType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { _DarkTheme, _LightTheme, DarkTheme } from '../utils/Theme';

const {
  d_switch,
  d_bgColor,
  d_headerColor,
  d_txtColor,
  d_grey,
  d_preferenceTxt,
} = _DarkTheme;

const { l_grey, l_switch, l_headerColor, l_headerColor2 } = _LightTheme;

export function DrawerContent(props) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [isEnable, setIsEnable] = useState(false);

  const isOn = () => {
    toggleTheme();
    setIsEnable(prevState => !prevState);
  };

  const signOut = async () => {
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
    <View style={[styles.container, DarkTheme() && darkTheme.container]}>
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
            <Text style={[styles.title, DarkTheme() && darkTheme.title]}>
              {username}
            </Text>
          </View>
        </View>

        <View style={[styles.preference, DarkTheme() && darkTheme.preference]}>
          <Text
            style={[
              styles.preferenceTxt,
              DarkTheme() && darkTheme.preferenceTxt,
            ]}>
            Dark Theme
          </Text>
          <View>
            <Switch
              style={styles.switch}
              trackColor={{ true: '#383972' }}
              thumbColor={isEnable ? l_switch : d_switch}
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
          DarkTheme() && darkTheme.bottomDrawerSection,
        ]}>
        <Icon
          name="logout"
          color={DarkTheme() ? d_headerColor : l_headerColor}
          size={30}
        />
        <Text style={[styles.logoutText, DarkTheme() && darkTheme.logoutText]}>
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  drawerContent: { flex: 1 },
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
    color: l_headerColor2,
  },
  drawerSection: { marginTop: 15 },
  bottomDrawerSection: {
    paddingVertical: 10,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    borderTopColor: l_grey,
    borderTopWidth: 1,
    borderBottomColor: l_grey,
    borderBottomWidth: 1,
  },
  logoutText: {
    fontSize: 20,
    color: l_headerColor,
    marginLeft: 10,
  },
  preference: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopColor: l_grey,
    borderTopWidth: 1,
    borderBottomColor: l_grey,
    borderBottomWidth: 1,
  },
  preferenceTxt: {
    fontSize: 18,
    fontWeight: '600',
    color: l_headerColor2,
  },
});

const darkTheme = StyleSheet.create({
  container: { backgroundColor: d_bgColor },
  title: { color: d_txtColor },
  preferenceTxt: { color: d_preferenceTxt },
  logoutText: { color: d_headerColor },
  bottomDrawerSection: {
    borderTopColor: d_grey,
    borderBottomColor: d_grey,
  },
  preference: {
    borderTopColor: d_grey,
    borderBottomColor: d_grey,
  },
});
