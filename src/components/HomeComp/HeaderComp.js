import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HeaderComp = ({ headerTitle, count }) => {
  return (
    <View style={styles.headerCompView}>
      <Text style={styles.headerTxt}>{headerTitle}</Text>
      <View style={styles.headerCountView}>
        <Text style={styles.headerCount}>{count}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerCompView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

export default HeaderComp;
