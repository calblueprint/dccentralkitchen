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
          source={{ uri: product.image }}
          style={{ height: 86, width: 86, borderRadius: 12 }}
        />
        <Body>{product.name}</Body>
      </ColumnContainer>
    </ButtonContainer>
  );
}

export default ProductCard;
