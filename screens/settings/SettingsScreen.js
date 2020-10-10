import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Constants from 'expo-constants';
import * as Analytics from 'expo-firebase-analytics';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import AlertAsync from 'react-native-alert-async';
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
import { completeLogout } from '../../lib/authUtils';
import { logErrorToSentry } from '../../lib/logUtils';

export default function SettingsScreen(props) {
  const [isGuest, setGuest] = useState(false);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [logoutIsLoading, setLogoutIsLoading] = useState(false);

  const logout = async (signUp = false) => {
    let confirm = false;
    if (!signUp) {
      confirm = await AlertAsync(
        `Are you sure you want to ${isGuest ? 'exit Guest Mode' : 'log out'}?`,
        '',
        [
          {
            text: isGuest ? 'Exit' : 'Log Out',
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
      // Show the loading indicator
      setLogoutIsLoading(true);
      await Analytics.logEvent('logout', {
        is_guest: isGuest,
        redirect_to: signUp ? 'Sign Up' : 'Welcome',
      });
      completeLogout(props.navigation, signUp);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchUser = async () => {
        try {
          const customerId = await AsyncStorage.getItem('customerId');
          const guest = customerId === RecordIds.guestCustomerId;
          setGuest(guest);
          if (isActive && customerId != null && !guest) {
            const customer = await getCustomersById(customerId);
            setName(customer.name);
            setNumber(customer.phoneNumber);
          }
        } catch (err) {
          console.error('[SettingsScreen] Airtable:', err);
          logErrorToSentry({
            screen: 'SettingsScreen',
            action: 'useFocusEffect',
            error: err,
          });
        }
      };

      fetchUser();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <NavHeaderContainer>
        <NavButtonContainer onPress={() => props.navigation.toggleDrawer()}>
          <FontAwesome5 name="bars" solid size={24} />
        </NavButtonContainer>
        <NavTitle>Settings</NavTitle>
      </NavHeaderContainer>
      <ScrollView>
        <CategoryBar title="Account" />
        {isGuest && (
          <SettingsCard
            title="Log in or create an account"
            rightIcon="sign-out-alt"
            description="Start saving with Healthy Rewards"
            navigation={() => logout(true)}
          />
        )}
        {!isGuest && (
          <SettingsCard
            title={name}
            description="Update name"
            rightIcon="angle-right"
            navigation={() =>
              props.navigation.navigate('Name', {
                name,
              })
            }
          />
        )}
        {!isGuest && (
          <SettingsCard
            title={number}
            description="Update phone number"
            rightIcon="angle-right"
            navigation={() =>
              props.navigation.navigate('Number', {
                number,
              })
            }
          />
        )}
        <CategoryBar title="Notifications" />
        <SettingsCard
          title="Notifications"
          rightIcon="angle-right"
          description="Control what messages you receive"
          navigation={() => props.navigation.navigate('Notifications')}
        />
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
            WebBrowser.openBrowserAsync(
              'https://healthycorners-rewards.netlify.app/shared/privacypolicy.html'
            )
          }
        />
        <CategoryBar title="Help & Support" />
        <SettingsCard
          title="Frequently Asked Questions"
          navigation={() =>
            WebBrowser.openBrowserAsync(
              'https://healthycorners.calblueprint.org/faq.html'
            )
          }
        />
        <SettingsCard
          title="Report issue or submit feedback"
          navigation={() =>
            WebBrowser.openBrowserAsync('http://tiny.cc/RewardsFeedback')
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
            Nonprofits. Blueprint is a student organization at UC Berkeley that
            strives to make technology accessible and useful for those who
            create communities and promote public welfare.
          </Body>
          <ButtonContainer
            style={{ marginTop: 8 }}
            onPress={() =>
              WebBrowser.openBrowserAsync('https://calblueprint.org')
            }>
            <Body>Click here to learn more at calblueprint.org</Body>
          </ButtonContainer>
        </View>
        <CategoryBar title="Exit" />
        <SettingsCard
          title={isGuest ? 'Exit Guest Mode' : 'Log Out'}
          titleColor={Colors.error}
          navigation={() => logout()}
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
      {/* TODO @wangannie: Standardize into full loading overlay component */}
      {logoutIsLoading && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,.4)',
          }}>
          <ActivityIndicator size="large" color={Colors.lightText} />
        </View>
      )}
    </View>
  );
}

SettingsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
