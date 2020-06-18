import { FontAwesome5 } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import PropTypes from 'prop-types';
import React from 'react';
import Colors from '../constants/Colors';
import { HamburgerButton } from '../styled/hamburger';

function CenterLocation(props) {
  return (
    <HamburgerButton
      onPress={() => {
        Haptics.impactAsync('medium');
        props.callBack();
      }}
      style={{
        left: undefined,
        right: 16,
        marginBottom: 30,
        backgroundColor: '#2F7CF6',
      }}>
      <FontAwesome5
        name="location-arrow"
        solid
        size={20}
        color={Colors.lightText}
      />
    </HamburgerButton>
  );
}

CenterLocation.propTypes = {
  callBack: PropTypes.func.isRequired,
};

export default CenterLocation;
