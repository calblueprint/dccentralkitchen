import PropTypes from 'prop-types';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import Hamburger from '../../components/Hamburger';
import NewsItem from '../../components/news/NewsItem';
import { getNewsItems } from '../../lib/newsUtils';
import { TopText } from '../../styled/news';

class NewsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsItems: [],
    };
  }

  async componentDidMount() {
    try {
      const newsItems = await getNewsItems();
      this.setState({ newsItems });
    } catch (err) {
      console.error('[NewsScreen] Airtable:', err);
    }
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
  header: null,
};

NewsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default NewsScreen;
