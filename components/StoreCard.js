import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Body, Title, Caption } from '../components/BaseComponents';
import { InLineContainer } from '../styles/shared';

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
        <H3>EBT: {ebt ? <Subtitle>Yes</Subtitle> : <Subtitle>No</Subtitle>}</H3>
      </TouchableOpacity>
    </View>
  );
}

export default StoreCard;
