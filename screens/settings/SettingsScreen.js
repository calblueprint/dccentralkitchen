import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import {
  AsyncStorage,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Body,
  NavButton,
  NavHeaderContainer,
  NavTitle,
  Subhead,
} from '../../components/BaseComponents';
import CategoryBar from '../../components/resources/CategoryBar';
import SettingsCard from '../../components/settings/SettingsCard';
import Colors from '../../constants/Colors';
import RecordIds from '../../constants/RecordIds';
import { getCustomersById } from '../../lib/airtable/request';
import { ResourceItemCard } from '../../styled/resources';

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGuest: false,
      name: '',
      number: '',
    };
  }

  // Load customer record & transactions
  async componentDidMount() {
    const customerId = await AsyncStorage.getItem('customerId');
    const isGuest = customerId === RecordIds.guestCustomerId;
    if (customerId != null && !isGuest) {
      const customer = await getCustomersById(customerId);
      const { name } = customer;
      const number = customer.phoneNumber;
      this.setState({ name, number });
    }
    this.setState({ isGuest });
  }

  _logout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <View>
        <NavHeaderContainer>
          <NavButton onPress={() => this.props.navigation.goBack(null)}>
            <FontAwesome5 name="arrow-left" solid size={24} />
          </NavButton>
          <NavTitle>Settings</NavTitle>
        </NavHeaderContainer>
        <ScrollView>
          <CategoryBar icon="user" title="Account" />
          {this.state.isGuest && (
            <SettingsCard
              title="Create an account"
              description="Start earning healthy rewards."
              path="Auth"
              navigation={this.props.navigation}
            />
          )}
          {!this.state.isGuest && (
            <SettingsCard
              title={this.state.name}
              description="Change Name"
              path="Name"
              navigation={this.props.navigation}
            />
          )}
          {!this.state.isGuest && (
            <SettingsCard
              title={this.state.number}
              description="Change Phone Number"
              path="Number"
              navigation={this.props.navigation}
            />
          )}
          <CategoryBar icon="info" title="About" />
          <Image
            source={require('../../assets/images/blueprint.png')}
            style={{
              maxWidth: '100%',
              resizeMode: 'contain',
              marginTop: 25,
              marginLeft: 25,
            }}
          />
          <Body
            style={{
              margin: 25,
              marginTop: 4,
            }}>
            This app was built by Blueprint, Technology for Nonprofits.
            Blueprint is a very, very real student organization at UC Berkeley
            that exists purely to make money.
          </Body>
          <CategoryBar
            icon="sign-out-alt"
            title={this.state.guest ? 'Exit' : 'Log out'}
          />
          <TouchableOpacity onPress={() => this._logout()}>
            {this.state.isGuest ? (
              <ResourceItemCard>
                <Subhead color={Colors.error}>Exit Guest Mode</Subhead>
              </ResourceItemCard>
            ) : (
              <ResourceItemCard>
                <Subhead color={Colors.error}>Log out of account</Subhead>
              </ResourceItemCard>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

SettingsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
