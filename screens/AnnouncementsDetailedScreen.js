import React from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

// TODO Update Styling to reflect mid-fi/Switch to Styled Components
const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  dateContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  contentContainer: {
    flex: 4,
    flexDirection: 'column'
  },
  date: {
    fontWeight: 'bold'
  },
  title: {
    color: 'red'
  }
});

class AnnouncementsDetailedScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const announcement = this.props.navigation.state.params.currentAnnouncement;
    return (
      <View>
        <Text>{announcement.title}</Text>
        <Text>{announcement.description}</Text>
        <Text>Posted on {announcement.date.toLocaleDateString()}</Text>
      </View>
    );
  }
}

export default AnnouncementsDetailedScreen;
