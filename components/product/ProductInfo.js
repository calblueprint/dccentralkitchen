import PropTypes from 'prop-types';
import React from 'react';
import { displayDollarValue } from '../../lib/common';
import { ProductInfoContainer } from '../../styled/product';
import { SpaceBetweenRowContainer } from '../../styled/shared';
import { Body, Caption, Title } from '../BaseComponents';

/**
 * @prop
 * */

function ProductInfo({ product }) {
  const { name, points, customerCost } = product;
  return (
    <ProductInfoContainer>
      <Title>{name}</Title>
      <SpaceBetweenRowContainer style={{ marginTop: 8, paddingBottom: 16 }}>
        <Caption>{`${displayDollarValue(customerCost)} each`}</Caption>
        <Caption>{`Points Earned: ${points}`}</Caption>
      </SpaceBetweenRowContainer>
      <Body>
        Note: Not all products listed are available at every store. Please call
        individual stores to ask which products are available.
      </Body>
    </ProductInfoContainer>
  );
}

ProductInfo.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductInfo;
