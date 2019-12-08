import * as Font from "expo-font";
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import Announcements from '../components/Announcements';
import Hamburger from '../components/Hamburger.js'
import BASE from '../lib/common';
import { TopText } from '../styles/announcements';
const announceTable = BASE('Announcements').select({ view: 'Grid view' });

class AnnouncementScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      announcements: []
    };
  }

  async componentDidMount() {
    announceTable.firstPage()
      .then(data => {
        let announcementsArray = data.map(record => {
          let announcement = {};
          let thisDate = new Date(record.get('Created'));
          announcement['title'] = record.get('Title'),
          announcement['description'] = record.get('Description'),
          announcement['date'] = thisDate,
          announcement['id'] = record.get('ID')
          return announcement;
        })
        this.setState({
          announcements: announcementsArray
        })
      })
  }

  render() {
    return (
      <View>
        <Hamburger navigation = {this.props.navigation}></Hamburger>
        <TopText> News </TopText>
        <ScrollView>
          {this.state.announcements ?
            this.state.announcements.map(announce => (
            <Announcements
              key={announce.id}
              announcement={announce}
              navigation={this.props.navigation}
            />
          ))
          : <Text>''</Text>
        }
        </ScrollView>
      </View>
    );
  }
}

AnnouncementScreen.navigationOptions = {
  header: null
};

export default AnnouncementScreen;

