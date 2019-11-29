import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { H3, Subtitle, Title } from '../styles/shared';

/**
 * @prop
 * */

function StoreCard({ store, callBack }) {
  const { name, hours, address, distance } = store;
  return (
    <View style={{ marginBottom: 10 }}>
      <TouchableOpacity onPress={callBack}>
        <Title>{name}</Title>
        <Subtitle>{address}</Subtitle>
        <H3>{hours}</H3>
        <H3>Distance: {distance} mi </H3>
      </TouchableOpacity>
    </View>
  );
}

export default StoreCard;
