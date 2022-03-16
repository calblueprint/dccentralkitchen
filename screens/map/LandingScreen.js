/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/prop-types */
import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, View } from 'react-native';
import {
  NavButtonContainer,
  NavHeaderContainer,
  NavTitle,
} from '../../components/BaseComponents';
import HowAppWorks from '../../components/rewards/HowAppWorks';

// eslint-disable-next-line react/prop-types
export default function LandingScreen(props) {
  return (
    <View style={{ flex: 1 }}>
      <NavHeaderContainer>
        <NavButtonContainer onPress={() => props.navigation.toggleDrawer()}>
          <FontAwesome5 name="bars" solid size={24} />
        </NavButtonContainer>
        <NavTitle>How Our App Works</NavTitle>
      </NavHeaderContainer>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <HowAppWorks isGuest={true} />
      </ScrollView>
    </View>
  );
}
