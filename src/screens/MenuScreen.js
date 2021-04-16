import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { getAllNotes } from '../services/Home/action';
import Ionicons from 'react-native-vector-icons/Ionicons';

class MenuScreen extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.userID !== this.props.userID) {
      this.props.getAllNotes(this.props.userID);
    }
    // if (prevProps.notes !== this.props.notes) {
    //   console.log('Menu Screen All Data:', this.props.notes);
    // }
  }
  renderCategoriesList = () => {
    const categories = {};
    let lastTitle;
    if (this.props.notes) {
      lastTitle = this.props.notes[this.props.notes.length - 1];
    }
    this.props.notes &&
      this.props.notes.map(item => {
        const title = item.title;
        if (categories.hasOwnProperty(item.title)) {
          categories[title] += 1;
        } else {
          categories[title] = 1;
        }
      });
    return Object.entries(categories).map((item, index) => {
      let last = lastTitle.title === item[0];
      return (
        <TouchableOpacity style={styles.categoryView} key={index}>
          <Text
            style={[
              styles.categoryTitle,
              styles.categoryTxt,
              last && styles.activeTxt,
            ]}>
            {item[0]}
          </Text>
          <View style={[styles.countView, last && styles.activeCountView]}>
            <Text
              style={[
                styles.categoryCount,
                styles.categoryTxt,
                last && styles.activeTxt,
              ]}>
              {item[1]}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerTxtWrapper}>
          <Text>My </Text>
          <Text style={styles.txtColorBlue}>Notes</Text>
        </Text>
        <ScrollView>{this.renderCategoriesList()}</ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.menuBtn}>
            <Ionicons name="menu-outline" size={60} color="#383972" />
            <Text style={styles.menuBtnTxt}>Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="ios-add-circle-sharp" size={70} color="#e62d1d" />
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
  menuBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuBtnTxt: {
    marginTop: -10,
    color: '#e62d1d',
    letterSpacing: 1.5,
    fontSize: 12,
  },
});

const mapStateToProps = state => ({
  userID: state.login.userID,
  notes: state.home.notes,
});

const mapDispacthToProps = dispatch => ({
  getAllNotes: value => dispatch(getAllNotes(value)),
});

export default connect(mapStateToProps, mapDispacthToProps)(MenuScreen);
