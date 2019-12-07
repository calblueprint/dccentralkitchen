import * as Font from "expo-font";
import React from 'react';
import { AsyncStorage, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import Announcements from '../components/Announcements';
import BASE from '../lib/common';
import { TopText } from '../styles/announcements';
const announceTable = BASE('Announcements').select({ view: 'Grid view' });
const firstAnnouncements = [];

announceTable.eachPage(
  function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    // Grabs title, description, date, per record and stores it in list.
    records.forEach(function (record) {
      let thisDate = new Date(record.get('Created'));
      let curr = {
        title: record.get('Title'),
        description: record.get('Description'),
        date: thisDate,
        id: record.get('ID')
      };
      firstAnnouncements.push(curr);
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();
  },
  function done(err) {
    if (err) {
      console.error(err);
    }
  });

class AnnouncementScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      announcements: firstAnnouncements
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Poppins: require('../assets/fonts/Poppins-Regular.ttf')
    });
  }

  render() {
    return (
      <View>
        <TopText> News </TopText>
        <ScrollView>
          {this.state.announcements.map(announce => (
            <Announcements
              key={announce.id}
              announcement={announce}
              navigation={this.props.navigation}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default AnnouncementScreen;
