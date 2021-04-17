import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import NoteCardComp from '../components/HomeComp/NoteCardComp';
import HeaderComp from '../components/HomeComp/HeaderComp';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { deleteNote, getAllNotes } from '../services/Home/action';

class NotesScreen extends Component {
  state = { renderFlag: false, refershing: false };

  deleteNote = noteId => {
    console.log('UserId', this.props.userID);
    this.props.userID !== undefined &&
      Alert.alert('Delete Note', 'Are you sure you want to delete this note', [
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            this.props.deleteNote(this.props.userID, noteId);
            this.setState({ renderFlag: !this.state.renderFlag });
          },
        },
        { text: 'Close', style: 'cancel' },
      ]);
  };

  getNewData = () => {
    console.log('refershing', this.state.refershing);
    this.setState({ refershing: true });
    this.props.getAllNotes(this.props.userID);
    this.setState({ refershing: false });
  };

  render() {
    const dark = this.props.darkTheme;
    const { Title } = this.props.route.params;
    let Notes;
    if (this.props.notes !== undefined) {
      Notes = this.props.notes.filter(note => note.title === Title);
    }
    return (
      <View style={[styles.container, dark && darkTheme.conatiner]}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('MenuScreen')}
          style={styles.backBtn}>
          <Ionicons
            name="chevron-back"
            size={30}
            color={dark ? '#fff' : '#383972'}
          />
          <Text style={[styles.backBtnTxt, dark && darkTheme.backBtnTxt]}>
            My Notes
          </Text>
        </TouchableOpacity>
        <HeaderComp
          headerTitle={Title}
          count={Notes !== undefined ? Notes.length : 0}
        />
        <View style={styles.flatListView}>
          {this.props.notes !== undefined && (
            <FlatList
              bounces={true}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              data={Notes}
              renderItem={item => (
                <NoteCardComp
                  deleteNote={value => this.deleteNote(value)}
                  Data={item.item}
                />
              )}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refershing}
                  onRefresh={() => this.getNewData()}
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
  }
}

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

const darkTheme = StyleSheet.create({
  conatiner: {
    backgroundColor: '#262626',
  },
  backBtnTxt: {
    color: '#fff',
  },
});

const mapStateToProps = state => ({
  userID: state.login.userID,
  notes: state.home.notes,
  darkTheme: state.home.darkTheme,
});

const mapDispacthToProps = dispatch => ({
  deleteNote: (userID, noteID) => dispatch(deleteNote(userID, noteID)),
  getAllNotes: value => dispatch(getAllNotes(value)),
});

export default connect(mapStateToProps, mapDispacthToProps)(NotesScreen);
