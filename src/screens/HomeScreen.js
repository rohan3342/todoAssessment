import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import NoteCardComp from '../components/HomeComp/NoteCardComp';
import HeaderComp from '../components/HomeComp/HeaderComp';
class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <HeaderComp headerTitle="Place" count="6" />
        <ScrollView style={styles.notesContainer}>
          <NoteCardComp />
          <NoteCardComp />
          <NoteCardComp />
          <NoteCardComp />
          <NoteCardComp />
          <NoteCardComp />
        </ScrollView>
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
});

export default HomeScreen;
