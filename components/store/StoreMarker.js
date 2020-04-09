import React from 'react';
import { Image } from 'react-native';
import { MarkerContainer, MarkerStoreName } from '../../styled/store';

function StoreMarker({ storeName, focused }) {
  return (
    <MarkerContainer>
      {focused && (
        <Image source={require('../../assets/images/marker_focused.png')} />
      )}
      {!focused && (
        <Image source={require('../../assets/images/marker_resting.png')} />
      )}
      <MarkerStoreName>{storeName}</MarkerStoreName>
    </MarkerContainer>
  );
}

export default StoreMarker;
