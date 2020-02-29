import React from 'react';
import { FilledButtonContainer, ButtonLabel } from '../BaseComponents';

/**
 * @prop
 * */

function StoreProductButton({ callBack }) {
  //   const { name, hours, address, distance, ebt } = store;
  return (
    <FilledButtonContainer
      width="40%"
      height="50%"
      color="#f07723"
      onPress={callBack}>
      <ButtonLabel color="#fff">See Products</ButtonLabel>
    </FilledButtonContainer>
  );
}

export default StoreProductButton;
