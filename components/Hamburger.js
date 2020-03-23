import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { HamburgerButton } from '../styled/hamburger';

export default class Hamburger extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <HamburgerButton onPress={() => this.props.navigation.toggleDrawer()}>
        <FontAwesome5 name="bars" solid size={24} />
      </HamburgerButton>
    );
  }
}
