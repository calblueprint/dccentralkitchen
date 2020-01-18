import * as Font from "expo-font";
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import Announcements from '../components/Announcements';
import Hamburger from '../components/Hamburger.js'
import BASE from '../lib/common';
import { TopText } from '../styles/announcements';
import getAnnouncements from './AnnouncementHelper.js';
//const announceTable = BASE('Announcements').select({ view: 'Grid view' });

class AnnouncementScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      announcements: []
    };
  }

  async componentDidMount() {
    getAnnouncements().then( announcements => {
      this.setState({announcements});}
    ) 
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

