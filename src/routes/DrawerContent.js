import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Avatar,
  Title,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import { DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { logOut } from '../services/Login/action';
import { useDispatch } from 'react-redux';

export function DrawerContent(props) {
  const dispatch = useDispatch();
  const signOut = () => {
    console.log('SignOut: DrawerContent');
    dispatch(logOut());
    props.navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <View style={styles.avatarView}>
            <Avatar.Image
              source={{
                uri: 'https://api.adorable.io/avatars/50/abott@adorable.png',
              }}
              size={50}
            />
          </View>
          <View style={styles.userInfoView}>
            <Title style={styles.title}>Name</Title>
          </View>
        </View>

        <Drawer.Section title="Preferences">
          <TouchableRipple>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
      </View>

      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => signOut()}
        />
      </Drawer.Section>
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
    paddingLeft: 20,
  },
  avatarView: {
    flexDirection: 'row',
    marginTop: 15,
  },
  userInfoView: {},
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
