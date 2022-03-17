import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import {
  NavButtonContainer,
  NavHeaderContainer,
  NavTitle,
} from './BaseComponents';

export default function WebComponent({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <NavHeaderContainer>
        <NavButtonContainer onPress={() => navigation.toggleDrawer()}>
          <FontAwesome5 name="bars" solid size={24} />
        </NavButtonContainer>
        <NavTitle>FAQ</NavTitle>
      </NavHeaderContainer>
      <WebView
        source={{ uri: 'https://healthycorners.calblueprint.org/faq.html' }}
      />
    </View>
  );
}
WebComponent.propTypes = {
  navigation: PropTypes.object.isRequired,
};
