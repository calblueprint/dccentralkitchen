import React from 'react';
import { View, Text } from 'react-native';

import { Subtitle, Title } from '../styles.js';

/**
 * @prop
 **/

function StoreCard({ store }) {
  const { name, id, latitude, longitude, hours, address } = store;
  return (
    <Text>{store.name}</Text>
  );
}

export default StoreCard;
