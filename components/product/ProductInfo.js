import React from 'react';
import { View } from 'react-native';
import { Body, Caption, Title, Subhead } from '../BaseComponents';

/**
 * @prop
 * */

function ProductInfo({ product }) {
  const { name, id, category, points, customerCost } = product;
  return (
    <View style={{ width: 300 }}>
      <Title>{name}</Title>
      <Subhead>Category: {category}</Subhead>
      <View style={{ flexDirection: 'row' }}>
        <Caption>${customerCost} each</Caption>
        <Caption>Points Earned: {points}</Caption>
      </View>
      <Body>
        Note: not all products listed are available at every store. Please call
        individual stores to ask which products are available.
      </Body>
    </View>
  );
}

export default ProductInfo;
