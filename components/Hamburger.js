import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { MapButtonStyling } from '../styled/MapButtonStyling';

function Hamburger({ navigation }) {
  return (
    <MapButtonStyling onPress={() => navigation.toggleDrawer()}>
      <FontAwesome5 name="bars" solid size={24} />
    </MapButtonStyling>
  );
}

Hamburger.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Hamburger;
