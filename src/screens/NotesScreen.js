import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import NoteCardComp from '../components/HomeComp/NoteCardComp';
import HeaderComp from '../components/HomeComp/HeaderComp';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

class NotesScreen extends Component {
  render() {
    const { Title, Count } = this.props.route.params;
    let Notes;
    if (this.props.notes !== undefined) {
      Notes = this.props.notes.filter(note => note.title === Title);
      console.log(Notes);
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('MenuScreen')}
          style={styles.backBtn}>
          <Ionicons name="chevron-back" size={30} color="#383972" />
          <Text style={styles.backBtnTxt}>My Notes</Text>
        </TouchableOpacity>
        <HeaderComp headerTitle={Title} count={Count} />
        <View style={styles.flatListView}>
          {this.props.notes !== undefined && (
            <FlatList
              bounces={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              data={Notes}
              renderItem={item => <NoteCardComp Data={item.item} />}
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

const mapStateToProps = state => ({
  notes: state.home.notes,
});

export default connect(mapStateToProps)(NotesScreen);
