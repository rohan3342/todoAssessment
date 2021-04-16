import React from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';

const NoteCardComp = ({ NoteDate, Data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleTxt}>Note Date</Text>
      <Text style={styles.dataTxt}>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
        odio.Quisque volutpat mattis eros.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flex: 1,
    width: '95%',
    backgroundColor: 'white',
    marginTop: 30,
    padding: 20,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  titleTxt: {
    fontSize: 14,
    color: '#E62D1D',
  },
  dataTxt: {
    marginTop: 10,
    fontSize: 16,
    color: '#383972',
    textAlign: 'justify',
  },
});

export default NoteCardComp;
