import React from 'react';
import { View } from 'react-native';
import { DateText, ContentText } from '../../styles/news';

function NewsDetailsScreen(props) {
  const { currentNewsItem } = props.navigation.state.params;
  return (
    <View>
      <DateText>{currentNewsItem.title}</DateText>
      <ContentText>{currentNewsItem.description}</ContentText>
      <ContentText>
        Posted on:&nbsp;
        {currentNewsItem.date.toLocaleDateString()}
      </ContentText>
    </View>
  );
}

export default NewsDetailsScreen;
