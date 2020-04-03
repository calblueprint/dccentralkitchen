import React from 'react';
import { Image } from 'react-native';
import Colors from '../../constants/Colors';
import { displayDollarValue } from '../../lib/common';
import { ColumnContainer, RowContainer } from '../../styled/shared';
import { Body, ButtonContainer, Caption } from '../BaseComponents';
/**
 * @prop
 * */

// TODO @tommypoa to use styled-components // Create Stylesheet for react native elements
function ProductCard({ product, store, navigation, displayPoints }) {
  return (
    <ButtonContainer
      onPress={() =>
        navigation.navigate('ProductDetails', {
          currentProduct: product,
          store,
        })
      }>
      <ColumnContainer>
        <Image
          source={{ uri: product.image }}
          style={{ height: 86, width: 86, borderRadius: 12 }}
        />
        <Body>{product.name}</Body>
        {product.detail && (
          <Caption color={Colors.secondaryText}>{product.detail}</Caption>
        )}
        <RowContainer>
          <Caption color={Colors.secondaryText}>
            {displayDollarValue(product.customerCost)} ea
          </Caption>
          {displayPoints && (
            <Caption color={Colors.secondaryText}>
              {' '}
              • {product.points} pts
            </Caption>
          )}
        </RowContainer>
      </ColumnContainer>
    </ButtonContainer>
  );
}

export default ProductCard;
