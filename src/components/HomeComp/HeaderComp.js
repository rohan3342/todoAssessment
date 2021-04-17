import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const HeaderComp = ({ headerTitle, count }) => {
  const dark = useSelector(state => state.home.darkTheme);
  return (
    <View style={styles.headerCompView}>
      <Text style={[styles.headerTxt, dark && darkTheme.headerTxt]}>
        {headerTitle}
      </Text>
      <View style={styles.headerCountView}>
        <Text style={[styles.headerCount, dark && darkTheme.headerCount]}>
          {count}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerCompView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  headerTxt: {
    color: '#E62D1D',
    fontSize: 42,
    fontWeight: '600',
  },
  headerCountView: {
    height: 50,
    width: 50,
    backgroundColor: 'rgba(230,45,29, 0.15)',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCount: {
    fontSize: 32,
    color: '#E62D1D',
    fontWeight: '600',
  },
});

const darkTheme = StyleSheet.create({
  headerTxt: {
    color: '#e05043',
  },
  headerCount: {
    color: '#e05043',
  },
});
export default HeaderComp;
