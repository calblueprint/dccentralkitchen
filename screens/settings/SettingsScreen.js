import { FontAwesome5 } from '@expo/vector-icons';
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
import AlertAsync from 'react-native-alert-async';
import * as Sentry from 'sentry-expo';
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

  _logout = async (signUp = false) => {
    let confirm = false;
    if (!signUp) {
      confirm = await AlertAsync(
        `Are you sure you want to ${
          this.state.isGuest ? 'exit Guest Mode' : 'log out'
        }?`,
        '',
        [
          {
            text: this.state.isGuest ? 'Exit' : 'Log Out',
            onPress: () => true,
          },
          {
            text: 'Cancel',
            onPress: () => false,
            style: 'cancel',
          },
        ],
        { cancelable: false }
      );
    } else {
      confirm = true;
    }
    if (confirm) {
      this.props.navigation.navigate('Stores');
      await AsyncStorage.clear();
      Sentry.configureScope((scope) => scope.clear());
      this.props.navigation.navigate(
        'Auth',
        signUp ? { screen: 'SignUp' } : { screen: 'Welcome' }
      );
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavHeaderContainer>
          <NavButtonContainer
            onPress={() => this.props.navigation.toggleDrawer()}>
            <FontAwesome5 name="bars" solid size={24} />
          </NavButtonContainer>
          <NavTitle>Settings</NavTitle>
        </NavHeaderContainer>
        <ScrollView>
          <CategoryBar title="Account" />
          {this.state.isGuest && (
            <SettingsCard
              title="Sign in or create an account"
              rightIcon="sign-out-alt"
              description="Start saving with Healthy Rewards"
              navigation={() => this._logout(true)}
            />
          )}
          {!this.state.isGuest && (
            <SettingsCard
              title={this.state.name}
              description="Change name"
              rightIcon="angle-right"
              navigation={() => this.props.navigation.navigate('Name')}
            />
          )}
          {!this.state.isGuest && (
            <SettingsCard
              title={this.state.number}
              description="Change phone number"
              rightIcon="angle-right"
              navigation={() => this.props.navigation.navigate('Number')}
            />
          )}
          <CategoryBar title="Privacy" />
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

          <CategoryBar title="About" />
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
          <CategoryBar title="Exit" />
          <SettingsCard
            title={this.state.isGuest ? 'Exit Guest Mode' : 'Log Out'}
            titleColor={Colors.error}
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
