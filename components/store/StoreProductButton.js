import PropTypes from 'prop-types';
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
      <ButtonLabel color={Colors.lightText}>See Products</ButtonLabel>
    </FilledButtonContainer>
  );
}

StoreProductButton.propTypes = {
  callBack: PropTypes.func.isRequired,
};

export default StoreProductButton;
