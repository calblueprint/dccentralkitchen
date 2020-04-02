import React from 'react';
import {
  ProductInfoCaptionContainer,
  ProductInfoContainer,
  ProductNoticeContainer,
} from '../../styled/product';
import { Body, Caption, Title } from '../BaseComponents';

/**
 * @prop
 * */

function ProductInfo({ product }) {
  const { name, points, customerCost } = product;
  return (
    <ProductInfoContainer>
      <Title>{name}</Title>
      <ProductInfoCaptionContainer>
        <Caption>${customerCost.toFixed(2)} each</Caption>
        <Caption>{`Points Earned: ${points}`}</Caption>
      </ProductInfoCaptionContainer>
      <ProductNoticeContainer>
        <Body>
          Note: Not all products listed are available at every store. Please
          call individual stores to ask which products are available.
        </Body>
      </ProductNoticeContainer>
    </ProductInfoContainer>
  );
}

export default ProductInfo;
