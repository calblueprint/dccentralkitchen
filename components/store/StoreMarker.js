import PropTypes from 'prop-types';
import React from 'react';
import { Image } from 'react-native';
import { MarkerContainer, MarkerStoreName } from '../../styled/store';

function StoreMarker({ storeName, focused }) {
  return (
    <MarkerContainer>
      {focused ? (
        <Image
          style={{ width: 64, height: 64 }}
          source={require('../../assets/images/Marker_Focused.png')}
        />
      ) : (
        <Image
          style={{ width: 32, height: 32 }}
          source={require('../../assets/images/Marker_Resting.png')}
        />
      )}
      <MarkerStoreName focused={focused}>{storeName}</MarkerStoreName>
    </MarkerContainer>
  );
}

StoreMarker.propTypes = {
  storeName: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired,
};

export default StoreMarker;
