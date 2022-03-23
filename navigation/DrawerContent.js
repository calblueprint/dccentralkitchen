import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerItemList } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import * as Analytics from 'expo-firebase-analytics';
import * as Updates from 'expo-updates';
import * as WebBrowser from 'expo-web-browser';
import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';
import * as Sentry from 'sentry-expo';
import {
  BigTitle,
  ButtonContainer,
  ButtonLabel,
  FilledButtonContainer,
  Subtitle,
} from '../components/BaseComponents';
import Colors from '../constants/Colors';
import { env } from '../environment';
import { getCustomerById } from '../lib/airtable/request';
import { completeLogout, getAsyncCustomerAuth } from '../lib/authUtils';
import { clearUserLog, logErrorToSentry, setUserLog } from '../lib/logUtils';
import LandingScreen from '../screens/map/LandingScreen';
import { ColumnContainer, SpaceBetweenRowContainer } from '../styled/shared';

function DrawerContent(props) {
  const [customer, setCustomer] = React.useState(null);
  const [logoutIsLoading, setLogoutIsLoading] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const logout = async () => {
    // Show the loading indicator
    setLogoutIsLoading(true);
    await Analytics.logEvent('logout', {
      is_guest: true,
      redirect_to: 'PhoneNumber',
    });
    completeLogout(props.navigation, true);
  };

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchUser = async () => {
        try {
          const customerId = await getAsyncCustomerAuth();

          let cust = null;
          if (customerId != null) {
            cust = await getCustomerById(customerId.id);
          } else {
            cust = { name: 'Guest' };
          }
          if (isActive) {
            setUserLog(cust);
            if (cust.name === 'Guest') {
              Sentry.Native.captureMessage('Guest Login Successful');
              Analytics.logEvent('drawer_load', {
                purpose: 'Guest Login Successful',
              });
            } else {
              Sentry.Native.captureMessage('Returning User');
              Analytics.logEvent('drawer_load', {
                purpose: 'Returning User',
              });
            }
            setCustomer(cust);
            setIsLoading(false);
          }
        } catch (err) {
          // console.error('[DrawerContent] Airtable:', err);
          logErrorToSentry({
            screen: 'DrawerContent',
            action: 'componentDidMount',
            error: err,
          });
          Alert.alert('Session Expired', 'Refresh the app and log in again.', [
            {
              text: 'OK',
              onPress: async () => {
                clearUserLog();
                await AsyncStorage.removeItem('customerId');
                await Updates.reloadAsync();
              },
            },
          ]);
        }
      };

      fetchUser();

      return () => {
        isActive = false;
      };
    }, [])
  );

  if (isLoading) {
    return null;
  }

  const isGuest = customer.name === 'Guest';
  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
      }}>
      <View
        style={{
          backgroundColor: isGuest ? Colors.bgDark : Colors.primaryGreen,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          padding: 24,
          marginBottom: 24,
        }}>
        <ColumnContainer style={{ marginTop: 32, width: '100%' }}>
          <SpaceBetweenRowContainer
            style={{ alignItems: 'center', marginBottom: 4, width: '100%' }}>
            <BigTitle style={{ color: Colors.lightText }}>
              {customer.name}
            </BigTitle>
            {isGuest && (
              <FilledButtonContainer
                style={{
                  borderColor: Colors.lightText,
                  borderWidth: 1,
                  height: 30,
                  width: 80,
                  marginVertical: 8,
                  marginRight: 8,
                }}
                color={Colors.bgLight}
                onPress={() => logout()}>
                {logoutIsLoading ? (
                  <ActivityIndicator />
                ) : (
                  <ButtonLabel noCaps>Log In</ButtonLabel>
                )}
              </FilledButtonContainer>
            )}
          </SpaceBetweenRowContainer>
        </ColumnContainer>
      </View>
      <DrawerItemList {...props} />
      <View
        style={{
          flex: 2,
          marginLeft: 24,
          flexDirection: 'column',
          justifyContent: 'flex-end',
          verticalAlign: 'bottom',
          paddingBottom: 36,
        }}>
        {env === 'dev' && (
          <ButtonContainer
            style={{ paddingBottom: 16 }}
            onPress={() => completeLogout(props.navigation, false)}>
            <Subtitle color={Colors.error}>TESTING LOGOUT</Subtitle>
          </ButtonContainer>
        )}

        <ButtonContainer
          style={{ paddingBottom: 16 }}
          onPress={() =>
            WebBrowser.openBrowserAsync('http://tiny.cc/nominatestore')
          }>
          <Subtitle>Nominate a store</Subtitle>
        </ButtonContainer>
        <ButtonContainer
          onPress={() =>
            WebBrowser.openBrowserAsync('http://tiny.cc/RewardsFeedback')
          }>
          <Subtitle>Submit feedback</Subtitle>
        </ButtonContainer>
      </View>
    </View>
  );
}

DrawerContent.propTypes = {
  navigation: PropTypes.object.isRequired,
};
export default DrawerContent;

DrawerContent.propTypes = {
  navigation: PropTypes.object.isRequired,
};
