import React from 'react';
import { FilledButtonContainer, ButtonLabel } from '../BaseComponents';
import Colors from '../../assets/Colors';

/**
 * @prop
 * */

function StoreProductButton({ callBack }) {
  //   const { name, hours, address, distance, ebt } = store;
  return (
    <FilledButtonContainer
      width="130px"
      height="35px"
      color={Colors.primaryOrange}
      onPress={callBack}>
      <ButtonLabel color="#fff">See Products</ButtonLabel>
    </FilledButtonContainer>
  );
}

export default StoreProductButton;
