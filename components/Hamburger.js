import React from 'react';
import { TouchableOpacity, Button } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { HamburgerButton } from '../styled/hamburger';
//TODO: ADD FONTAWESOME ICON
export default class Hamburger extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <HamburgerButton>
        <FontAwesome5 name="bars" solid size={24} />
      </HamburgerButton>
    );
  }
}
