import PropTypes from 'prop-types';
import React from 'react';
import Colors from '../../constants/Colors';
import { displayDollarValue } from '../../lib/common';
import { ProductInfoContainer } from '../../styled/product';
import { SpaceBetweenRowContainer } from '../../styled/shared';
import { Body, Caption, Subhead, Title } from '../BaseComponents';
/**
 * @prop
 * */

function ProductInfo({ product }) {
  const { name, detail, points, customerCost } = product;
  return (
    <ProductInfoContainer>
      <Title>{name}</Title>
      <Subhead>{detail}</Subhead>
      <SpaceBetweenRowContainer style={{ marginTop: 12, paddingBottom: 16 }}>
        <Body>{`${displayDollarValue(customerCost)} each`}</Body>
        <Body>{`Points Earned: ${points}`}</Body>
      </SpaceBetweenRowContainer>
      <Caption color={Colors.secondaryText}>
        Note: Pricing and availability may vary. Please contact or visit this
        store to confirm.
      </Caption>
    </ProductInfoContainer>
  );
}

ProductInfo.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductInfo;
