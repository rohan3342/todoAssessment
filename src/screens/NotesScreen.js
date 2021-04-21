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
import { _DarkTheme, _LightTheme, DarkTheme } from '../utils/Theme';

const { d_bgColor, d_txtColor, d_icon } = _DarkTheme;
const { l_bgColor, l_headerColor2 } = _LightTheme;

const NotesScreen = props => {
  const [renderFlag, setRenderFlag] = useState(false);
  const [refershing, setRefershing] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const userID = useSelector(state => state.login.userID);
  const notes = useSelector(state => state.home.notes);

  // eslint-disable-next-line no-unused-vars
  const dark = useSelector(state => state.home.darkTheme);
  const dispatch = useDispatch();

  const deletenote = noteId => {
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
  const { Title } = props.route.params;
  let Notes = notes?.filter(note => note.title === Title);

  return (
    <View style={[styles.container, DarkTheme() && darkTheme.conatiner]}>
      <TouchableOpacity
        onPress={() => props.navigation.goBack('MenuScreen')}
        style={styles.backBtn}>
        <Ionicons
          name="chevron-back"
          size={30}
          color={DarkTheme() ? l_bgColor : d_icon}
        />
        <Text style={[styles.backBtnTxt, DarkTheme() && darkTheme.backBtnTxt]}>
          My Notes
        </Text>
      </TouchableOpacity>
      <HeaderComp headerTitle={Title} count={Notes?.length} />
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
    backgroundColor: l_bgColor,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'absolute',
  },
  backBtnTxt: {
    fontSize: 16,
    color: l_headerColor2,
  },
  flatListView: { flex: 1 },
});

const darkTheme = StyleSheet.create({
  conatiner: { backgroundColor: d_bgColor },
  backBtnTxt: { color: d_txtColor },
});

export default NotesScreen;
