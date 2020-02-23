import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import Colors from '../assets/Colors';
import { InLineContainer } from '../styles/shared';
import { Body, Caption, Title } from './BaseComponents';

/**
 * @prop
 * */

function StoreCard({ store, callBack }) {
  const { name, hours, address, distance, ebt } = store;
  return (
    <View style={{ marginBottom: 10 }}>
      <TouchableOpacity onPress={callBack}>
        <Title>{name}</Title>
        <Caption>Distance: {distance} mi </Caption>
        <InLineContainer>
          <MaterialCommunityIcons name="directions" size={16} />
          <Body>{address}</Body>
        </InLineContainer>
        <InLineContainer>
          <FontAwesome name="clock-o" size={12} />
          <Body>{hours}</Body>
        </InLineContainer>
        <Body>EBT: {ebt ? <Body>Yes</Body> : <Body>No</Body>}</Body>
      </TouchableOpacity>
    </View>
  );
}

export default StoreCard;
