import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import Colors from '../constants/Colors';
import { HamburgerButton } from '../styled/hamburger';

function CenterLocation(props) {
  const { callBack } = props.callBack;
  return (
    <HamburgerButton
      onPress={() => callBack()}
      style={{ marginRight: 24, marginTop: 2 }}>
      <FontAwesome5
        name="location-arrow"
        solid
        size={20}
        color={Colors.primaryGreen}
      />
    </HamburgerButton>
  );
}

CenterLocation.propTypes = {
  callBack: PropTypes.func.isRequired,
};

export default CenterLocation;
