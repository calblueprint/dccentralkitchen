import PropTypes from 'prop-types';
import React from 'react';
import Colors from '../../constants/Colors';
import { ButtonLabel, FilledButtonContainer } from '../BaseComponents';

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

StoreProductButton.propTypes = {
  callBack: PropTypes.func.isRequired,
};

export default StoreProductButton;
