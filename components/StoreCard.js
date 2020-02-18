import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import {Subhead, Body, Title,Caption} from '../components/BaseComponents';
import { H3, InLineContainer, Subtitle } from '../styles/shared';

/**
 * @prop
 * */

function StoreCard({ store, callBack }) {
  const { name, hours, address, distance } = store;
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
      </TouchableOpacity>
    </View>
  );
}

export default StoreCard;
