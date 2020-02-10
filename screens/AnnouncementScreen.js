import React from 'react';
import { ScrollView, Text, ViewComponent, TouchableOpacity, Button, View } from 'react-native';

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
    // const {goBack} = this.props.navigation;
    return (
      <View>
        <TouchableOpacity
              style={{
                  backgroundColor:'white',
                  width:50,
                  height:50,
                  zIndex:100,
                  position:'absolute', // comment out this line to see the menu toggle
                  top:50,
                  left: 15,
                  borderRadius: 23,
                  borderColor: '#ffffff',
                  borderWidth: 4,
                  shadowOpacity: 0.25,
                  shadowRadius: 5,
                  shadowColor: 'black',
                  shadowOffset: { height: 3, width: 4 },
              }}>
              <Button 
                  color="black" 
                  title="X"
                  onPress={() => this.props.navigation.goBack(null)} >
              </Button>
          </TouchableOpacity>
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
  header: null
};

export default AnnouncementScreen;
