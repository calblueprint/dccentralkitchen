import React from 'react';
import { FilledButtonContainer, TextButton } from '../BaseComponents';

/**
 * @prop
 * */

function StoreProductButton() {
  //   const { name, hours, address, distance, ebt } = store;
  return (
    <FilledButtonContainer color="#f07723">
      <TextButton color="white">See Products</TextButton>
    </FilledButtonContainer>
  );
}

export default StoreProductButton;
