import React from 'react';
import { Body, Caption, Title } from '../BaseComponents';
import {
  ProductInfoContainer,
  ProductInfoCaptionContainer,
  ProductNoticeContainer
} from '../../styled/product';

/**
 * @prop
 * */

function ProductInfo({ product }) {
  const { name, id, category, points, customerCost } = product;
  return (
    <ProductInfoContainer>
      <Title>{name}</Title>
      <ProductInfoCaptionContainer>
        <Caption>${customerCost} each</Caption>
        <Caption>Points Earned: {points}</Caption>
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
