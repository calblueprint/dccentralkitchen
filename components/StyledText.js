import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'react-native';

export function MonoText(props) {
  return (
    <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />
  );
}

MonoText.propTypes = {
  style: PropTypes.object,
};

MonoText.defaultProps = {
  style: null,
};
