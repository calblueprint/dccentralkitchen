import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { CircleIconContainer } from './BaseComponents';

export default class CircleIcon extends React.Component {
  render() {
    return (
      <CircleIconContainer color={this.props.circleColor}>
        <FontAwesome5
          name={this.props.icon}
          size={22}
          solid
          color={this.props.iconColor}
          style={{ paddingTop: 1 }}
        />
      </CircleIconContainer>
    );
  }
}

CircleIcon.propTypes = {
  circleColor: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  iconColor: PropTypes.string.isRequired,
};
