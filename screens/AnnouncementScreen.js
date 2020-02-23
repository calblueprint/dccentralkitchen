import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import Announcements from '../components/Announcements';
import Hamburger from '../components/Hamburger';
import { TopText } from '../styles/announcements';
import getAnnouncements from './AnnouncementHelper';

class AnnouncementScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      announcements: []
    };
  }

  async componentDidMount() {
    getAnnouncements().then(announcements => {
      this.setState({ announcements });
    });
  }

  render() {
    return (
      <View>
        <Hamburger navigation={this.props.navigation} />
        <TopText> News </TopText>
        <ScrollView>
          {this.state.announcements ? (
            this.state.announcements.map(announce => (
              <Announcements
                key={announce.id}
                announcement={announce}
                navigation={this.props.navigation}
              />
            ))
          ) : (
            <Text>&apos;&apos;</Text>
          )}
        </ScrollView>
      </View>
    );
  }
}

AnnouncementScreen.navigationOptions = {
  headerShown: false
};

export default AnnouncementScreen;
