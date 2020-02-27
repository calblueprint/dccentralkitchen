import React from 'react';
import { TouchableOpacity, Button, View } from 'react-native';
import { Linking } from 'react-native';
import { TopText } from '../../styled/resources';

const resources = [
  {
    name: 'DC Central Kitchen',
    url: 'https://dccentralkitchen.org/'
  },
  {
    name: 'Healthy Corners Initiative',
    url: 'https://dccentralkitchen.org/healthy-corners/'
  },
  {
    name: 'Important Link',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  }
];

class ResourceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            width: 50,
            height: 50,
            zIndex: 100,
            position: 'absolute', // comment out this line to see the menu toggle
            top: 50,
            left: 15,
            borderRadius: 23,
            borderColor: '#ffffff',
            borderWidth: 4,
            shadowOpacity: 0.25,
            shadowRadius: 5,
            shadowColor: 'black',
            shadowOffset: { height: 3, width: 4 }
          }}>
          <Button
            color="black"
            title="X"
            onPress={() => this.props.navigation.goBack(null)}
          />
        </TouchableOpacity>
        <TopText> Community Resources </TopText>
        {resources.map(r => (
          <Button
            color="black"
            title={r.name}
            onPress={() => Linking.openURL(r.url)}
          />
        ))}
      </View>
    );
  }
}

ResourceScreen.navigationOptions = {
  headerShown: false
};

export default ResourceScreen;
