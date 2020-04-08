import React from 'react';
import Colors from '../../constants/Colors';
import { ButtonLabel, FilledButtonContainer } from '../BaseComponents';

/**
 * @prop
 * */

function StoreProductButton({ callBack }) {
  return (
    <FilledButtonContainer
      width="130px"
      height="35px"
      color={Colors.primaryOrange}
      onPress={callBack}
      style={{ borderRadius: 10 }}>
      <ButtonLabel color={Colors.lightest}>See Products</ButtonLabel>
    </FilledButtonContainer>
  );
}

export default StoreProductButton;
