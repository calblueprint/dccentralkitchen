import React from 'react';
import { Image } from 'react-native';
import { ButtonContainer, Body } from '../BaseComponents';

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
      <Body>{product.name}</Body>
    </ButtonContainer>
  );
}

export default ProductCard;
