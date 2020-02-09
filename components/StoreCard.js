import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { H3, InLineContainer, Subtitle, Title } from '../styles/shared';

/**
 * @prop
 * */

function StoreCard({ store, callBack }) {
  const { name, hours, address, distance, ebt } = store;
  return (
    <View style={{ marginBottom: 10 }}>
      <TouchableOpacity onPress={callBack}>
        <Title>{name}</Title>
        <H3>Distance: {distance} mi </H3>
        <InLineContainer>
          <MaterialCommunityIcons name="directions" size={16} />
          <Subtitle>{address}</Subtitle>
        </InLineContainer>
        <InLineContainer>
          <FontAwesome name="clock-o" size={12} />
          <H3>{hours}</H3>
        </InLineContainer>
        <H3>
          EBT: {ebt ? <Subtitle>yuh</Subtitle> : <Subtitle>nuu</Subtitle>}
        </H3>
      </TouchableOpacity>
    </View>
  );
}

export default StoreCard;
