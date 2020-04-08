import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { HamburgerButton } from '../styled/hamburger';

export default class CenterLocation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <HamburgerButton
        onPress={() => this.props.callBack()}
        style={{ marginRight: 24 }}>
        <FontAwesome5 name="location-arrow" solid size={20} color="blue" />
      </HamburgerButton>
    );
  }
}
