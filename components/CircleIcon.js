import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { CircleIconContainer } from './BaseComponents';

function CircleIcon({ circleColor, icon, iconColor }) {
  return (
    <CircleIconContainer color={circleColor}>
      <FontAwesome5
        name={icon}
        size={22}
        solid
        color={iconColor}
        style={{ paddingTop: 1 }}
      />
    </CircleIconContainer>
  );
}

CircleIcon.propTypes = {
  circleColor: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  iconColor: PropTypes.string.isRequired,
};

export default CircleIcon;
