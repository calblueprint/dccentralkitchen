import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import NewsItem from '../../components/NewsItem';
import Hamburger from '../../components/Hamburger';
import { TopText } from '../../styles/news';
import getNewsItems from '../../lib/newsUtils';

class NewsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsItems: []
    };
  }

  async componentDidMount() {
    getNewsItems().then(newsItems => {
      this.setState({ newsItems });
    });
  }

  render() {
    return (
      <View>
        <Hamburger navigation={this.props.navigation} />
        <TopText> News </TopText>
        <ScrollView>
          {this.state.newsItems ? (
            this.state.newsItems.map(newsItem => (
              <NewsItem
                key={newsItem.id}
                newsItem={newsItem}
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

NewsScreen.navigationOptions = {
  header: null
};

export default NewsScreen;
