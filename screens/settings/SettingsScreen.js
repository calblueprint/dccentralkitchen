import { FontAwesome5 } from '@expo/vector-icons';
import { Updates } from 'expo';
import Constants from 'expo-constants';
import PropTypes from 'prop-types';
import React from 'react';
import {
  AsyncStorage,
  Image,
  Linking,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import {
  Body,
  ButtonContainer,
  NavButtonContainer,
  NavHeaderContainer,
  NavTitle,
} from '../../components/BaseComponents';
import CategoryBar from '../../components/resources/CategoryBar';
import SettingsCard from '../../components/settings/SettingsCard';
import Colors from '../../constants/Colors';
import RecordIds from '../../constants/RecordIds';
import { getCustomersById } from '../../lib/airtable/request';

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
    this.props.navigation.goBack();
    await AsyncStorage.clear();
    if (this.state.isGuest) {
      this.props.navigation.navigate('SignUp');
    } else {
      this.props.navigation.navigate('Auth');
    }
    Updates.reload();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavHeaderContainer>
          <NavButtonContainer
            onPress={() => this.props.navigation.goBack(null)}>
            <FontAwesome5 name="arrow-left" solid size={24} />
          </NavButtonContainer>
          <NavTitle>Settings</NavTitle>
        </NavHeaderContainer>
        <ScrollView>
          <CategoryBar icon="user" title="Account" />
          {this.state.isGuest && (
            <SettingsCard
              title="Create an account"
              description="Start earning Healthy Rewards"
              navigation={this._logout}
            />
          )}
          {!this.state.isGuest && (
            <SettingsCard
              title={this.state.name}
              description="Change name"
              navigation={() => this.props.navigation.navigate('Name')}
            />
          )}
          {!this.state.isGuest && (
            <SettingsCard
              title={this.state.number}
              description="Change phone number"
              navigation={() => this.props.navigation.navigate('Number')}
            />
          )}
          <CategoryBar icon="shield-alt" title="Privacy" />
          <SettingsCard
            title="Location Settings"
            description="Manage your location sharing preferences"
            navigation={
              Platform.OS === 'ios'
                ? () => Linking.openURL('app-settings:')
                : () => Linking.openSettings()
            }
          />
          <SettingsCard
            title="Privacy Policy"
            navigation={() =>
              Linking.openURL(
                'https://healthycorners-rewards.netlify.app/shared/privacypolicy.html'
              )
            }
          />

          <CategoryBar icon="info" title="About" />
          <View style={{ padding: 24 }}>
            <Image
              source={require('../../assets/images/blueprint-logo.png')}
              style={{
                maxWidth: '50%',
                resizeMode: 'contain',
                height: 50,
                marginBottom: 4,
              }}
            />
            <Body>
              This app was designed and developed by Blueprint, Technology for
              Nonprofits. Blueprint is a student organization at UC Berkeley
              that strives to make technology accessible and useful for those
              who create communities and promote public welfare.
            </Body>
            <ButtonContainer
              style={{ marginTop: 8 }}
              onPress={() => Linking.openURL('https://calblueprint.org')}>
              <Body>Click here to learn more at calblueprint.org</Body>
            </ButtonContainer>
          </View>
          <CategoryBar
            icon="sign-out-alt"
            title={this.state.isGuest ? 'Exit' : 'Log Out'}
          />
          <SettingsCard
            title={this.state.isGuest ? 'Exit Guest Mode' : 'Log Out'}
            titleColor={!this.state.isGuest ? Colors.error : null}
            navigation={this._logout}
          />
          <Body
            color={Colors.secondaryText}
            style={{
              marginLeft: 24,
              marginTop: 8,
              marginBottom: 200,
            }}>
            {`Version ${Constants.manifest.version}`}
          </Body>
        </ScrollView>
      </View>
    );
  }
}

SettingsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
