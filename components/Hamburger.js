import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { HamburgerButton } from '../styled/hamburger';

function Hamburger({ navigation }) {
  return (
    <HamburgerButton onPress={() => navigation.toggleDrawer()}>
      <FontAwesome5 name="bars" solid size={24} />
    </HamburgerButton>
  );
}

Hamburger.propTypes = {
  navigation: PropTypes.any.isRequired,
};

export default Hamburger;
