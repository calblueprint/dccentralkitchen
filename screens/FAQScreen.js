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

export default function FAQScreen(props) {
  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
      }}>
      <NavHeaderContainer>
        <NavButtonContainer onPress={() => props.navigation.goBack()}>
          <FontAwesome5 name="arrow-left" solid size={24} />
        </NavButtonContainer>
        <NavTitle>FAQ</NavTitle>
      </NavHeaderContainer>
      <WebView
        source={{
          uri: 'https://healthycorners.calblueprint.org/faq.html',
        }}
      />
    </View>
  );
}

FAQScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
