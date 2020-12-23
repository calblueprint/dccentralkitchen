import PropTypes from 'prop-types';
import React from 'react';
import { Image, PixelRatio, View } from 'react-native';
import { MarkerContainer, MarkerStoreName } from '../../styled/store';

function StoreMarker({ storeName, focused, showName }) {
  return (
    <MarkerContainer>
      {focused ? (
        <Image
          style={{
            width: 64 * Math.min(PixelRatio.getFontScale(), 1.4),
            height: 64 * Math.min(PixelRatio.getFontScale(), 1.4),
          }}
          source={require('../../assets/images/Marker_Focused.png')}
        />
      ) : (
        <Image
          style={{
            width: 32 * Math.min(PixelRatio.getFontScale(), 1.4),
            height: 32 * Math.min(PixelRatio.getFontScale(), 1.4),
          }}
          source={require('../../assets/images/Marker_Resting.png')}
        />
      )}
      {showName && (
        <View
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            paddingHorizontal: 6,
            borderRadius: 8,
          }}>
          <MarkerStoreName focused={focused}>{storeName}</MarkerStoreName>
        </View>
      )}
    </MarkerContainer>
  );
}

StoreMarker.propTypes = {
  storeName: PropTypes.string.isRequired,
  focused: PropTypes.bool,
  showName: PropTypes.bool,
};

StoreMarker.defaultProps = {
  focused: false,
  showName: true,
};

export default StoreMarker;
