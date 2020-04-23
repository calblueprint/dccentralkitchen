import PropTypes from 'prop-types';
import React from 'react';
import { Image } from 'react-native';
import Colors from '../../constants/Colors';
import Window from '../../constants/Layout';
import { displayDollarValue } from '../../lib/common';
import { ColumnContainer, RowContainer } from '../../styled/shared';
import { Body, ButtonContainer, Caption } from '../BaseComponents';

function ProductCard({
  product,
  store,
  navigation,
  displayPoints,
  productsScreen,
}) {
  return (
    <ButtonContainer
      onPress={() =>
        navigation.navigate('ProductDetails', {
          currentProduct: product,
          store,
        })
      }>
      <ColumnContainer
        style={
          productsScreen
            ? { width: (Window.width - 32 - 40) / 2 }
            : { width: 86 }
        }>
        <Image
          source={{ uri: product.imageUrl }}
          style={{
            height: 86,
            borderRadius: 12,
          }}
        />
        <Body numberOfLines={1} ellipsizeMode="tail">
          {product.name}
        </Body>
        {product.detail && (
          <Caption
            numberOfLines={1}
            ellipsizeMode="tail"
            color={Colors.secondaryText}>
            {product.detail}
          </Caption>
        )}
        <RowContainer>
          <Caption color={Colors.secondaryText}>
            {`${displayDollarValue(product.customerCost)} ea`}
          </Caption>

          {displayPoints && (
            <Caption color={Colors.secondaryText}>
              {`${' '} • ${product.points} pts`}
            </Caption>
          )}
        </RowContainer>
      </ColumnContainer>
    </ButtonContainer>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  displayPoints: PropTypes.bool,
  productsScreen: PropTypes.bool,
};

ProductCard.defaultProps = {
  displayPoints: false,
  productsScreen: false,
};

export default ProductCard;
