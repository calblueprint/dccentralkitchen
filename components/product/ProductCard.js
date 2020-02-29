import React from 'react';
import { Image } from 'react-native';
import { ButtonContainer, Caption } from '../BaseComponents';
import { ColumnContainer } from '../../styled/shared';

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
      <ColumnContainer>
        <Image
          source={require('../../assets/images/robot-dev.png')}
          style={{ borderRadius: 80 / 2 }}
        />
        <Caption>{product.name}</Caption>
      </ColumnContainer>
    </ButtonContainer>
  );
}

export default ProductCard;
