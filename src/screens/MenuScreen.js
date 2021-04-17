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

class MenuScreen extends Component {
  state = { refershing: false, test: false };
  componentDidUpdate(prevProps) {
    if (prevProps.userID !== this.props.userID) {
      this.getData();
    }
  }
  getData = () => {
    this.props.getAllNotes(this.props.userID);
  };

  renderCategoriesList = () => {
    const categories = {};
    this.props.notes &&
      this.props.notes.map(item => {
        const title = item.title;
        if (categories.hasOwnProperty(item.title)) {
          categories[title] += 1;
        } else {
          categories[title] = 1;
        }
      });
    return Object.entries(categories);
  };

  MenuItems = (title, count) => {
    console.log(title, count);
    const dark = this.props.darkTheme;
    let lastTitle;
    if (this.props.notes) {
      lastTitle = this.props.notes[this.props.notes.length - 1];
    }
    let last = lastTitle.title === title;
    const viewAllNotes = (Title, Count) => {
      this.props.navigation.navigate('NotesScreen', {
        Title,
        Count,
      });
    };
    return (
      <TouchableOpacity
        key={title + count}
        onPress={() => viewAllNotes(title, count)}
        style={styles.categoryView}>
        <Text
          style={[
            styles.categoryTitle,
            styles.categoryTxt,
            dark && darkTheme.categoryTxt,
            last && styles.activeTxt,
            last && dark && darkTheme.activeTxt,
          ]}>
          {title}
        </Text>
        <View
          style={[
            styles.countView,
            dark && darkTheme.countView,
            last && styles.activeCountView,
            last && dark && darkTheme.activeCountView,
          ]}>
          <Text
            style={[
              styles.categoryCount,
              styles.categoryTxt,
              last && styles.activeTxt,
              last && dark && darkTheme.activeTxt,
            ]}>
            {count}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const dark = this.props.darkTheme;
    return (
      <View style={[styles.container, dark && darkTheme.conatiner]}>
        <Text
          style={[styles.headerTxtWrapper, dark && darkTheme.headerTxtWrapper]}>
          <Text>My </Text>
          <Text style={[styles.txtColorBlue, dark && darkTheme.txtColorBlue]}>
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
              color={dark ? '#fff' : '#383972'}
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
    backgroundColor: 'white',
  },
  headerTxtWrapper: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#E62D1D',
    letterSpacing: 1.5,
  },
  txtColorBlue: {
    color: '#383972',
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
    color: '#383972',
    fontWeight: '600',
  },
  categoryCount: {
    fontSize: 36,
  },
  activeTxt: {
    color: '#e62d1d',
  },
  countView: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCountView: {
    backgroundColor: 'rgba(230,45,29, 0.15)',
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
    backgroundColor: '#262626',
  },
  txtColorBlue: {
    color: 'white',
  },
  categoryTxt: {
    color: 'white',
  },
  countView: {
    color: 'white',
  },
  headerTxtWrapper: {
    color: '#e05043',
  },
  activeTxt: {
    color: '#e05043',
  },
  activeCountView: {
    backgroundColor: 'rgba(224, 80, 67,0.15)',
  },
});
const mapStateToProps = state => ({
  userID: state.login.userID,
  notes: state.home.notes,
  darkTheme: state.home.darkTheme,
});

const mapDispacthToProps = dispatch => ({
  getAllNotes: value => dispatch(getAllNotes(value)),
});

export default connect(mapStateToProps, mapDispacthToProps)(MenuScreen);
