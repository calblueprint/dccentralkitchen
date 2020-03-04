import React from 'react';
import { TouchableOpacity, Button, View } from 'react-native';
import Hamburger from '../../components/Hamburger';
import { ScrollView, Text } from 'react-native';
import { Linking } from 'react-native';
import { ResourcesCard } from '../../components/resources/ResourcesCard';
import { TopText } from '../../styled/resources';

const resources = [
  {
    name: 'DC Central Kitchen',
    url: 'https://dccentralkitchen.org/',
    content: 'This is filler text.'
  },
  {
    name: 'Healthy Corners Initiative',
    url: 'https://dccentralkitchen.org/healthy-corners/',
    content: 'This is filler text.'
  },
  {
    name: 'Important Link',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    content: 'This is filler text.'
  }
];

class ResourceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resourceCards: []
    };
  }

  render() {
    return (
      <View>
        <TopText> Resources </TopText>
        <ScrollView>
          {resources.map(r => (
            <ResourcesCard> </ResourcesCard>
          ))}
        </ScrollView>
      </View>
    );
  }
}

ResourceScreen.navigationOptions = {
  headerShown: false
};

export default ResourceScreen;
