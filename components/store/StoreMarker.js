import PropTypes from 'prop-types';
import React from 'react';
import { Image, PixelRatio, View } from 'react-native';
import { MarkerContainer, MarkerStoreName } from '../../styled/store';

const MARKER_SIZE_FOCUSED = 80 * Math.min(PixelRatio.getFontScale(), 1.4);
const MARKER_SIZE_REGULAR = 56 * Math.min(PixelRatio.getFontScale(), 1.4);

function StoreMarker({ snapOrEbtAccepted, wic, storeName, focused, showName }) {
  const imageSize = focused ? MARKER_SIZE_FOCUSED : MARKER_SIZE_REGULAR;
  let imageSource;
  if (snapOrEbtAccepted && wic) {
    imageSource = focused
      ? require('../../assets/images/mix/map/Marker_Focused_snap_wic_4x.png')
      : require('../../assets/images/mix/map/Marker_Regular_snap_wic_4x.png');
  } else if (snapOrEbtAccepted) {
    imageSource = focused
      ? require('../../assets/images/mix/map/Marker_Focused_snap_4x.png')
      : require('../../assets/images/mix/map/Marker_Regular_snap_4x.png');
  } else if (wic) {
    imageSource = focused
      ? require('../../assets/images/mix/map/Marker_Focused_wic_4x.png')
      : require('../../assets/images/mix/map/Marker_Regular_wic_4x.png');
  } else {
    imageSource = focused
      ? require('../../assets/images/mix/map/Marker_Focused_4x.png')
      : require('../../assets/images/mix/map/Marker_Regular_4x.png');
  }

  return (
    <MarkerContainer>
      <Image
        style={{
          width: imageSize,
          height: imageSize,
        }}
        source={imageSource}
      />

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
  wic: PropTypes.bool,
  snapOrEbtAccepted: PropTypes.bool,
};

StoreMarker.defaultProps = {
  focused: false,
  showName: true,
  wic: false,
  snapOrEbtAccepted: false,
};

export default StoreMarker;
