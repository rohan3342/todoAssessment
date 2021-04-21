import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  RefreshControl,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import { getAllNotes } from '../services/Home/action';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { _DarkTheme, _LightTheme, DarkTheme } from '../utils/Theme';

const {
  d_bgColor,
  d_headerColor,
  d_txtColor,
  d_activeCountBGColor,
} = _DarkTheme;

const {
  l_bgColor,
  l_headerColor,
  l_headerColor2,
  l_activeCountBGColor,
} = _LightTheme;

class MenuScreen extends Component {
  state = { refershing: false, test: false };

  componentDidUpdate(prevProps) {
    prevProps.userID !== this.props.userID && this.getData();
  }

  getData = () => this.props.getAllNotes(this.props.userID);

  renderCategoriesList = () => {
    const notes = this.props.notes;
    const categories = {};
    notes?.map(item => {
      const title = item.title;
      categories.hasOwnProperty(item.title)
        ? (categories[title] += 1)
        : (categories[title] = 1);
    });
    return Object.entries(categories);
  };

  MenuItems = (TITLE, COUNT) => {
    const notes = this.props.notes;
    const { title } = notes && this.props.notes[this.props.notes.length - 1];
    const last = title === TITLE;

    const viewAllNotes = (Title, Count) =>
      this.props.navigation.navigate('NotesScreen', {
        Title,
        Count,
      });

    return (
      <TouchableOpacity
        key={TITLE + COUNT}
        onPress={() => viewAllNotes(TITLE, COUNT)}
        style={styles.categoryView}>
        <Text
          style={[
            styles.categoryTitle,
            styles.categoryTxt,
            DarkTheme() && darkTheme.categoryTxt,
            last && styles.activeTxt,
            last && DarkTheme() && darkTheme.activeTxt,
          ]}>
          {TITLE}
        </Text>
        <View
          style={[
            styles.countView,
            DarkTheme() && darkTheme.countView,
            last && styles.activeCountView,
            last && DarkTheme() && darkTheme.activeCountView,
          ]}>
          <Text
            style={[
              styles.categoryCount,
              styles.categoryTxt,
              last && styles.activeTxt,
              last && DarkTheme() && darkTheme.activeTxt,
            ]}>
            {COUNT}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    this.props.dark;
    return (
      <View style={[styles.container, DarkTheme() && darkTheme.conatiner]}>
        <Text
          style={[
            styles.headerTxtWrapper,
            DarkTheme() && darkTheme.headerTxtWrapper,
          ]}>
          <Text>My </Text>
          <Text
            style={[
              styles.txtColorBlue,
              DarkTheme() && darkTheme.txtColorBlue,
            ]}>
            Notes
          </Text>
        </Text>
        <View style={styles.flatListView}>
          {this.props.notes !== undefined && (
            <FlatList
              bounces={true}
              showsVerticalScrollIndicator={false}
              keyExtractor={(_, index) => index}
              data={this.renderCategoriesList()}
              renderItem={item => this.MenuItems(item.item[0], item.item[1])}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refershing}
                  onRefresh={() => this.getData()}
                  tintColor="red"
                  colors={['green', 'red']}
                  size={RefreshControl.SIZE.LARGE}
                />
              }
            />
          )}
        </View>
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
            <Ionicons
              name="menu-outline"
              size={70}
              color={DarkTheme() ? '#fff' : '#383972'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AddNoteScreen')}>
            <Ionicons name="ios-add-circle-sharp" size={70} color="#e05043" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 30,
    backgroundColor: l_bgColor,
  },
  headerTxtWrapper: {
    fontSize: 50,
    fontWeight: 'bold',
    color: l_headerColor,
    letterSpacing: 1.5,
  },
  txtColorBlue: {
    color: l_headerColor2,
  },
  categoryView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  categoryTitle: {
    fontSize: 32,
  },
  categoryTxt: {
    color: l_headerColor2,
    fontWeight: '600',
  },
  categoryCount: {
    fontSize: 36,
  },
  activeTxt: {
    color: l_headerColor,
  },
  countView: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCountView: {
    backgroundColor: l_activeCountBGColor,
    borderRadius: 25,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flatListView: {
    flex: 1,
  },
});

const darkTheme = StyleSheet.create({
  conatiner: {
    backgroundColor: d_bgColor,
  },
  txtColorBlue: {
    color: d_txtColor,
  },
  categoryTxt: {
    color: d_txtColor,
  },
  countView: {
    color: d_txtColor,
  },
  headerTxtWrapper: {
    color: d_headerColor,
  },
  activeTxt: {
    color: d_headerColor,
  },
  activeCountView: {
    backgroundColor: d_activeCountBGColor,
  },
});

const mapStateToProps = state => ({
  userID: state.login.userID,
  notes: state.home.notes,
  dark: state.home.darkTheme,
});

const mapDispacthToProps = dispatch => ({
  getAllNotes: value => dispatch(getAllNotes(value)),
});

export default connect(mapStateToProps, mapDispacthToProps)(MenuScreen);
