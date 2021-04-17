import React, { Component } from 'react';
import { View, Alert, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { addNote } from '../services/Home/action';
import { connect } from 'react-redux';

class AddNoteScreen extends Component {
  state = {
    title: '',
    data: '',
  };

  getTitle = text => this.setState({ title: text });
  getData = text => this.setState({ data: text });

  validateText = () => {
    const { title, data } = this.state;
    if (title === '') {
      Alert.alert('Empty Title', 'Please Fill the Title');
    } else if (data === '') {
      Alert.alert('Empty Note', 'Please Fill the Note');
    } else {
      this.addNote();
      this.setState({
        username: '',
        password: '',
      });
    }
  };

  addNote = () => {
    const { title, data } = this.state;
    this.props.addNote(this.props.userID, title, data);
    this.props.navigation.navigate('MenuScreen');
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('MenuScreen')}
          style={styles.backBtn}>
          <Ionicons name="chevron-back" size={30} color="#383972" />
          <Text style={styles.backBtnTxt}>My Notes</Text>
        </TouchableOpacity>
        <Text style={styles.headerTxtWrapper}>
          <Text>Add </Text>
          <Text style={styles.txtColorBlue}>Notes</Text>
        </Text>
        <View style={styles.mainContainer}>
          <CustomTextInput
            placeholder="Title"
            keyboardType="default"
            getInput={text => this.getTitle(text)}
          />
          <CustomTextInput
            placeholder="Enter Note"
            keyboardType="default"
            multiline={true}
            maxLength={600}
            customStyle={styles.dataTxt}
            getInput={text => this.getData(text)}
          />
        </View>
        <View style={styles.addBtnWrapper}>
          <TouchableOpacity
            onPress={() => this.validateText()}
            style={styles.addBtn}>
            <Ionicons name="ios-add-circle-outline" size={30} color="#fff" />
            <Text style={styles.addBtnText}>Add Note</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingTop: 30,
  },
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
  headerTxtWrapper: {
    marginVertical: 20,
    fontSize: 50,
    fontWeight: 'bold',
    color: '#E62D1D',
    letterSpacing: 1.5,
  },
  txtColorBlue: {
    color: '#383972',
  },
  mainContainer: {
    marginTop: 30,
  },
  dataTxt: {
    height: 200,
  },
  addBtnWrapper: {
    flex: 0.9,
    justifyContent: 'flex-end',
  },
  addBtn: {
    flexDirection: 'row',
    backgroundColor: '#383972',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  addBtnText: {
    marginLeft: 10,
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
});

const mapStateToProps = state => ({
  userID: state.login.userID,
});

const mapDispacthToProps = dispatch => ({
  addNote: (id, title, data) => dispatch(addNote(id, title, data)),
});

export default connect(mapStateToProps, mapDispacthToProps)(AddNoteScreen);
