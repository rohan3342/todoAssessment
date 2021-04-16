import React from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';

const NoteCardComp = ({ Data }) => {
  const { createdDate, data } = Data;
  return (
    <View style={styles.container}>
      <Text style={styles.titleTxt}>{Date(createdDate)}</Text>
      <Text style={styles.dataTxt}>{data}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flex: 1,
    width: '95%',
    backgroundColor: 'white',
    marginBottom: 20,
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
