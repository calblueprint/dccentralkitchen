import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Card,
  ContentContainer,
  ContentText,
  DateContainer,
  DateText,
} from '../../styled/news';

class NewsItem extends React.Component {
  displaySummary() {
    const des = this.props.newsItem.description;
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
          this.props.navigation.navigate('NewsDetails', {
            currentNewsItem: this.props.newsItem,
          })
        }>
        <Card>
          <DateContainer>
            <DateText>{this.props.newsItem.postDate.toDateString()}</DateText>
          </DateContainer>
          <ContentContainer>
            <DateText>{this.props.newsItem.title}</DateText>
            <ContentText>{this.displaySummary()}</ContentText>
          </ContentContainer>
        </Card>
      </TouchableOpacity>
    );
  }
}

NewsItem.propTypes = {
  navigation: PropTypes.object.isRequired,
  newsItem: PropTypes.object.isRequired,
};

export default NewsItem;
