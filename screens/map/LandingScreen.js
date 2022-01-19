/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/prop-types */
import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, View } from 'react-native';
import {
  BigTitle,
  NavButtonContainer,
  NavHeaderContainer,
} from '../../components/BaseComponents';
import HowAppWorks from '../../components/rewards/HowAppWorks';
import Colors from '../../constants/Colors';

// eslint-disable-next-line react/prop-types
export default function LandingScreen(props) {
  return (
    <View style={{ flex: 1 }}>
      <NavHeaderContainer
        vertical
        noShadow
        backgroundColor={Colors.primaryGreen}>
        <NavButtonContainer onPress={() => props.navigation.navigate('Stores')}>
          <FontAwesome5
            name="arrow-down"
            solid
            size={24}
            color={Colors.lightText}
          />
        </NavButtonContainer>
        <BigTitle
          style={{
            marginLeft: 18,
            color: Colors.lightText,
            fontSize: 36,
          }}>
          How Our App Works
        </BigTitle>
      </NavHeaderContainer>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <HowAppWorks isGuest={true} />
      </ScrollView>
    </View>
  );
}
