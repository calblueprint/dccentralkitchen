import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  Card,
  ContentContainer,
  DateContainer,
    DateText,
    ContentText
} from '../styles/announcements';

class Announcements extends React.Component {
  constructor(props) {
    super(props);
  }

  displaySummary() {
    const des = this.props.announcement.description;
    if (des.length >= 43) {
      let sum = des.substring(0, 40);
      sum = sum.concat('...');
      return sum;
    }
    return des;
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('AnnouncementsDetailed', {
            currentAnnouncement: this.props.announcement
          })
        }>
        <Card>
          <DateContainer>
            <DateText>
              {this.props.announcement.date.toDateString()}
            </DateText>
          </DateContainer>
          <ContentContainer>
            <DateText>{this.props.announcement.title}</DateText>
            <ContentText>{this.displaySummary()}</ContentText>
          </ContentContainer>
        </Card>
      </TouchableOpacity>
    );
  }
}

export default Announcements;
