import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Avatar,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { logOut } from '../services/Login/action';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function DrawerContent(props) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const signOut = () => {
    console.log('SignOut: DrawerContent');
    dispatch(logOut());
    props.navigation.navigate('LoginScreen');
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
    <View style={styles.container}>
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
            <Text style={styles.title}>{username}</Text>
          </View>
        </View>

        <Drawer.Section>
          <TouchableRipple>
            <View style={styles.preference}>
              <Text style={styles.preferenceTxt}>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
      </View>

      <TouchableOpacity
        onPress={() => signOut()}
        style={styles.bottomDrawerSection}>
        <Icon name="logout" color={'#E62D1D'} size={30} />
        <Text style={styles.logoutText}>Log Out</Text>
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
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 1,
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
    borderTopColor: '#f4f4f4',
    borderTopWidth: 2,
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 2,
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
  },
  preferenceTxt: {
    fontSize: 16,
    fontWeight: '600',
    color: '#383972',
  },
});
