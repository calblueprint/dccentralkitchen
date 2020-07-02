import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import {
  NavButtonContainer,
  NavHeaderContainer,
  NavTitle,
} from '../components/BaseComponents';

export default class FAQScreen extends React.Component {
  render() {
    return (
      <View
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
        }}>
        <NavHeaderContainer>
          <NavButtonContainer
            onPress={() => this.props.navigation.toggleDrawer()}>
            <FontAwesome5 name="bars" solid size={24} />
          </NavButtonContainer>
          <NavTitle>Frequently Asked Questions</NavTitle>
        </NavHeaderContainer>
        <WebView
          source={{
            uri: 'https://healthycorners.calblueprint.org/faq.html',
          }}
          style={{ marginTop: 10 }}
        />
      </View>
    );
  }
}

FAQScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
