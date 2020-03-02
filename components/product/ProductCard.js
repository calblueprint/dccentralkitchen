import React from 'react';
import { Image } from 'react-native';
import { ButtonContainer, Body } from '../BaseComponents';
import { ColumnContainer } from '../../styled/shared';

/**
 * @prop
 * */

// TODO @tommypoa to use styled-components // Create Stylesheet for react native elements
function ProductCard({ product, store, navigation }) {
  return (
    <ButtonContainer
      onPress={() =>
        navigation.navigate('ProductDetails', {
          currentProduct: product,
          store
        })
      }>
      <ColumnContainer>
        <Image
          source={require('../../assets/images/robot-dev.png')}
          style={{ height: 80, width: 80, borderRadius: 80 / 2 }}
        />
        <Body>{product.name}</Body>
      </ColumnContainer>
    </ButtonContainer>
  );
}

export default ProductCard;
