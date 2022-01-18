import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesome5 } from '@expo/vector-icons';

import { MapButtonStyling } from '../styled/MapButtonStyling';

function MapFilter({ navigation }) {
  return (
    <MapButtonStyling onPress={() => navigation.toggleDrawer()}>
      <FontAwesome5 name="filter" solid size={20} />
    </MapButtonStyling>
  );
}

MapFilter.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default MapFilter;
