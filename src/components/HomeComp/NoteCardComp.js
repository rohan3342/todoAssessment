import React from 'react';
import {
  View,
  Text,
  Animated,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NoteCardComp = ({ Data, deleteNote, scale, opacity }) => {
  const { createdDate, data, id } = Data;
  const dark = useSelector(state => state.home.darkTheme);
  return (
    <Animated.View
      style={[
        styles.container,
        dark && darkTheme.conatiner,
        { transform: [{ scale }], opacity },
      ]}>
      <View style={styles.dateandCross}>
        <Text style={[styles.titleTxt, dark && darkTheme.titleTxt]}>
          {createdDate}
        </Text>
        <TouchableOpacity onPress={() => deleteNote(id)}>
          <Ionicons
            name="ios-close"
            size={30}
            color={dark ? '#fff' : '#383972'}
          />
        </TouchableOpacity>
      </View>
      <Text style={[styles.dataTxt, dark && darkTheme.dataTxt]}>{data}</Text>
    </Animated.View>
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

const darkTheme = StyleSheet.create({
  conatiner: {
    backgroundColor: '#383972',
  },
  dataTxt: {
    color: '#fff',
  },
  titleTxt: {
    color: '#e05043',
  },
});

export default NoteCardComp;
