import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import {
  Body,
  NavButton,
  NavHeaderContainer,
  NavTitle,
} from '../../components/BaseComponents';
import StoreHours from '../../components/store/StoreHours';
import Colors from '../../constants/Colors';
import { formatPhoneNumber } from '../../lib/authUtils';
import { InLineContainer } from '../../styled/shared';
// import console = require('console');

export default class StoreScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { store } = this.props.route.params;
    const today = new Date();
    console.log(today.getDay());
    return (
      <View>
        <NavHeaderContainer withMargin>
          <NavButton onPress={() => this.props.navigation.goBack()}>
            <FontAwesome5 name="arrow-left" solid size={24} />
          </NavButton>
          <NavTitle>{store.storeName}</NavTitle>
        </NavHeaderContainer>
        <View style={{ marginLeft: 16, marginTop: 30 }}>
          {/* Directions */}
          <TouchableOpacity style={{ paddingBottom: 32 }}>
            <InLineContainer style={{ alignItems: 'center' }}>
              <FontAwesome5 name="directions" size={24} color={Colors.black} />
              <Body style={{ marginLeft: 12 }}>{store.address}</Body>
            </InLineContainer>
          </TouchableOpacity>
          {/* Phone Number */}
          <InLineContainer style={{ alignItems: 'center', paddingBottom: 32 }}>
            <FontAwesome5 name="phone" solid size={24} color={Colors.black} />
            <Body style={{ marginLeft: 12 }}>
              {formatPhoneNumber(store.phoneNumber)}
            </Body>
          </InLineContainer>
          {/* Store Hours */}
          <InLineContainer style={{ paddingBottom: 32 }}>
            <FontAwesome5
              name="clock"
              solid
              size={24}
              color={Colors.black}
              style={{ marginRight: 12 }}
            />
            <StoreHours hours={store.storeHours} />
          </InLineContainer>
          {/* Accepted Programs */}
          <InLineContainer style={{ alignItems: 'center', paddingBottom: 32 }}>
            <FontAwesome5 name="star" solid size={24} color={Colors.black} />
            <Body style={{ marginLeft: 12 }}>Accepted Programs</Body>
          </InLineContainer>
        </View>
      </View>
    );
  }
}

StoreScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};
