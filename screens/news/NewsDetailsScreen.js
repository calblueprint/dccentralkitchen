import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { ContentText, DateText } from '../../styled/news';

function NewsDetailsScreen(props) {
  const { currentNewsItem } = props.navigation.state.params;
  return (
    <View>
      <DateText>{currentNewsItem.title}</DateText>
      <ContentText>{currentNewsItem.description}</ContentText>
      <ContentText>
        Posted on:&nbsp;
        {currentNewsItem.postDate.toLocaleDateString()}
      </ContentText>
    </View>
  );
}

NewsDetailsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default NewsDetailsScreen;
