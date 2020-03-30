import React from 'react';
import { ProductInfoContainer } from '../../styled/product';
import { SpaceBetweenRowContainer } from '../../styled/shared';
import { Body, Caption, Title } from '../BaseComponents';

/**
 * @prop
 * */

function ProductInfo({ product }) {
  const { name, id, category, points, customerCost } = product;
  return (
    <ProductInfoContainer>
      <Title>{name}</Title>
      <SpaceBetweenRowContainer style={{ marginTop: 8, paddingBottom: 16 }}>
        <Caption>${customerCost.toFixed(2)} each</Caption>
        <Caption>{`Points Earned: ${points}`}</Caption>
      </SpaceBetweenRowContainer>
      <Body>
        Note: Not all products listed are available at every store. Please call
        individual stores to ask which products are available.
      </Body>
    </ProductInfoContainer>
  );
}

export default ProductInfo;
