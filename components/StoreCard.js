import React from 'react';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';

import { H3, Subtitle, Title, InLineContainer } from '../styles/shared';

/**
 * @prop
 * */

function StoreCard({ store, callBack }) {
  const { name, hours, address, distance } = store;
  return (
    <View style={{ marginBottom: 10 }}>
      <TouchableOpacity onPress={callBack}>
        <Title>{name}</Title>
        <InLineContainer>
          <MaterialCommunityIcons name="directions" size={16} />
          <Subtitle>{address}</Subtitle>
        </InLineContainer>
        <InLineContainer>
          <FontAwesome name="clock-o" size={12} />
          <H3>{hours}</H3>
        </InLineContainer>
        <H3>Distance: {distance} mi </H3>
      </TouchableOpacity>
    </View>
  );
}

export default StoreCard;
