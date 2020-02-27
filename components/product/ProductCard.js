import React from 'react';
import { Image, View } from 'react-native';
import { ProductBody } from '../../styled/product';
import { Button } from '../../styled/shared';
import { ButtonContainer, Caption } from '../BaseComponents';

/**
 * @prop
 * */

// TODO @tommypoa to use styled-components
function ProductCard({ product, store, navigation }) {
  return (
    <ButtonContainer
      onPress={() =>
        navigation.navigate('ProductDetails', {
          currentProduct: product,
          store
        })
      }>
      <Image
        source={require('../../assets/images/robot-dev.png')}
        style={{ width: 50, height: 50, borderRadius: 80 / 2 }}
      />
      <Caption>{product.name}</Caption>
    </ButtonContainer>
  );
}

export default ProductCard;
