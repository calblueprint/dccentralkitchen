import React from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import {
  DateText,
  ContentText
} from '../styles/announcements';

function AnnouncementsDetailedScreen(props){
    const announcement = props.navigation.state.params.currentAnnouncement;
    return (
      <View>
        <DateText>{announcement.title}</DateText>
        <ContentText>{announcement.description}</ContentText>
        <ContentText>Posted on {announcement.date.toLocaleDateString()}</ContentText>
      </View>
    );

}

export default AnnouncementsDetailedScreen;
