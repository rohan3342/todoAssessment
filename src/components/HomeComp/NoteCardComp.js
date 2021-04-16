import React from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NoteCardComp = ({ Data, deleteNote }) => {
  const { createdDate, data, id } = Data;
  return (
    <View style={styles.container}>
      <View style={styles.dateandCross}>
        <Text style={styles.titleTxt}>{createdDate}</Text>
        <TouchableOpacity onPress={() => deleteNote(id)}>
          <Ionicons name="ios-close" size={30} color="#383972" />
        </TouchableOpacity>
      </View>
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
  dateandCross: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleTxt: {
    fontSize: 14,
    color: '#E62D1D',
  },
  dataTxt: {
    marginTop: 5,
    fontSize: 16,
    color: '#383972',
    textAlign: 'justify',
  },
});

export default NoteCardComp;
