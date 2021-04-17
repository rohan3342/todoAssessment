import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native';
import NoteCardComp from '../components/HomeComp/NoteCardComp';
import HeaderComp from '../components/HomeComp/HeaderComp';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { deleteNote, getAllNotes } from '../services/Home/action';
import { useDispatch, useSelector } from 'react-redux';

const NotesScreen = props => {
  const [renderFlag, setRenderFlag] = useState(false);
  const [refershing, setRefershing] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const userID = useSelector(state => state.login.userID);
  const notes = useSelector(state => state.home.notes);
  const darkTheme = useSelector(state => state.home.darkTheme);
  const dispatch = useDispatch();
  const deletenote = noteId => {
    console.log('UserId', userID);
    userID !== undefined &&
      Alert.alert('Delete Note', 'Are you sure you want to delete this note', [
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            dispatch(deleteNote(userID, noteId));
            setRenderFlag(!renderFlag);
          },
        },
        { text: 'Close', style: 'cancel' },
      ]);
  };

  const getNewData = () => {
    setRefershing(true);
    dispatch(getAllNotes(userID));
    setRefershing(false);
  };

  const ITEM_SIZE = 160;
  const dark = darkTheme;
  const { Title } = props.route.params;
  let Notes;
  if (notes !== undefined) {
    Notes = notes.filter(note => note.title === Title);
  }
  return (
    <View style={[styles.container, dark && darkThemeStyle.conatiner]}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('MenuScreen')}
        style={styles.backBtn}>
        <Ionicons
          name="chevron-back"
          size={30}
          color={dark ? '#fff' : '#383972'}
        />
        <Text style={[styles.backBtnTxt, dark && darkThemeStyle.backBtnTxt]}>
          My Notes
        </Text>
      </TouchableOpacity>
      <HeaderComp
        headerTitle={Title}
        count={Notes !== undefined ? Notes.length : 0}
      />
      <View style={styles.flatListView}>
        {notes !== undefined && (
          <Animated.FlatList
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true },
            )}
            bounces={true}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            data={Notes}
            renderItem={item => {
              const inputRange = [
                -1,
                0,
                ITEM_SIZE * item.index,
                ITEM_SIZE * (item.index + 2),
              ];
              const opacityInputRange = [
                -1,
                0,
                ITEM_SIZE * item.index,
                ITEM_SIZE * (item.index + 0.8),
              ];
              const scale = scrollY.interpolate({
                inputRange,
                outputRange: [1, 1, 1, 0],
              });
              const opacity = scrollY.interpolate({
                inputRange: opacityInputRange,
                outputRange: [1, 1, 1, 0],
              });
              return (
                <NoteCardComp
                  scale={scale}
                  opacity={opacity}
                  deleteNote={value => deletenote(value)}
                  Data={item.item}
                />
              );
            }}
            refreshControl={
              <RefreshControl
                refreshing={refershing}
                onRefresh={() => getNewData()}
                tintColor="red"
                colors={['green', 'red']}
                size={RefreshControl.SIZE.LARGE}
              />
            }
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  notesContainer: {},
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'absolute',
  },
  backBtnTxt: {
    fontSize: 16,
    color: '#383972',
  },
  flatListView: {
    flex: 1,
  },
});

const darkThemeStyle = StyleSheet.create({
  conatiner: {
    backgroundColor: '#262626',
  },
  backBtnTxt: {
    color: '#fff',
  },
});

export default NotesScreen;
