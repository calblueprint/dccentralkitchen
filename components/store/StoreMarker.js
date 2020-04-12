import React from 'react';
import { Image } from 'react-native';
import { MarkerContainer, MarkerStoreName } from '../../styled/store';

function StoreMarker({ storeName, focused }) {
  return (
    <MarkerContainer>
      {focused && (
        <Image source={require('../../assets/images/Marker_Focused.png')} />
      )}
      {!focused && (
        <Image source={require('../../assets/images/Marker_Resting.png')} />
      )}
      <MarkerStoreName>{storeName}</MarkerStoreName>
    </MarkerContainer>
  );
}

export default StoreMarker;
