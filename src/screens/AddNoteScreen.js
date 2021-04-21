import React, { Component } from 'react';
import { View, Alert, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { addNote } from '../services/Home/action';
import { connect } from 'react-redux';
import { _DarkTheme, _LightTheme, DarkTheme } from '../utils/Theme';

const { d_bgColor, d_headerColor, d_txtColor, d_icon } = _DarkTheme;
const { l_bgColor, l_headerColor, l_headerColor2 } = _LightTheme;

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
    }
  };

  addNote = () => {
    const { title, data } = this.state;
    this.props.addNote(this.props.userID, title, data);
    this.props.navigation.goBack('MenuScreen');
  };

  render() {
    this.props.dark;
    return (
      <View style={[styles.container, DarkTheme() && darkTheme.conatiner]}>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack('MenuScreen')}
          style={styles.backBtn}>
          <Ionicons
            name="chevron-back"
            size={30}
            color={DarkTheme() ? l_bgColor : d_icon}
          />
          <Text
            style={[styles.backBtnTxt, DarkTheme() && darkTheme.backBtnTxt]}>
            My Notes
          </Text>
        </TouchableOpacity>
        <Text
          style={[
            styles.headerTxtWrapper,
            DarkTheme() && darkTheme.headerTxtWrapper,
          ]}>
          <Text>Add </Text>
          <Text
            style={[
              styles.txtColorBlue,
              DarkTheme() && darkTheme.txtColorBlue,
            ]}>
            Notes
          </Text>
        </Text>
        <View style={styles.body}>
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
        <View style={styles.addBtnView}>
          <TouchableOpacity
            onPress={() => this.validateText()}
            style={styles.addBtn}>
            <Ionicons name="ios-add-circle-outline" size={30} color="#fff" />
            <Text style={styles.addBtnTxt}>Add Note</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: l_bgColor,
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
    color: l_headerColor2,
  },
  headerTxtWrapper: {
    marginVertical: 20,
    fontSize: 50,
    fontWeight: 'bold',
    color: l_headerColor,
    letterSpacing: 1.5,
  },
  txtColorBlue: { color: l_headerColor2 },
  body: { marginTop: 30 },
  dataTxt: { height: 200 },
  addBtnView: {
    flex: 0.9,
    justifyContent: 'flex-end',
  },
  addBtn: {
    flexDirection: 'row',
    backgroundColor: l_headerColor2,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  addBtnTxt: {
    marginLeft: 10,
    color: l_bgColor,
    fontSize: 20,
    fontWeight: '600',
  },
});

const darkTheme = StyleSheet.create({
  conatiner: { backgroundColor: d_bgColor },
  backBtnTxt: { color: d_txtColor },
  headerTxtWrapper: { color: d_headerColor },
  txtColorBlue: { color: d_txtColor },
});

const mapStateToProps = state => ({
  userID: state.login.userID,
  dark: state.home.darkTheme,
});

const mapDispacthToProps = dispatch => ({
  addNote: (id, title, data) => dispatch(addNote(id, title, data)),
});

export default connect(mapStateToProps, mapDispacthToProps)(AddNoteScreen);
