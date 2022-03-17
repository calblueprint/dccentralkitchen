import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesome5 } from '@expo/vector-icons';

import { MapButtonStyling } from '../../styled/MapButtonStyling';

function MapFilter({ toggleMapFilterOptions }) {
  return (
    <MapButtonStyling onPress={toggleMapFilterOptions}>
      <FontAwesome5 name="filter" solid size={20} />
    </MapButtonStyling>
  );
}

MapFilter.propTypes = {
  toggleMapFilterOptions: PropTypes.func.isRequired,
};

export default MapFilter;
