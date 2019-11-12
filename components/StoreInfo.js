import React from 'react';
import { Text, View } from 'react-native';

import { Subtitle, Title } from '../styles';

/**
 * @prop
 **/

function StoreInfo({ store }) {
  const { name, id, latitude, longitude, hours, address } = store;
  return (
      <View style={{ width: 300 }}>
        <Title>{name}</Title>
        <Subtitle>Address: {address}</Subtitle>
        <Subtitle>Store Hours: {hours}</Subtitle>
      </View>
  );
}

export default StoreInfo;
