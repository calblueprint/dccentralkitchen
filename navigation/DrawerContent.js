import AsyncStorage from '@react-native-community/async-storage';
import { DrawerItemList } from '@react-navigation/drawer';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import * as Analytics from 'expo-firebase-analytics';
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
  Title,
} from '../components/BaseComponents';
import Colors from '../constants/Colors';
import { getCustomersById } from '../lib/airtable/request';
import { clearUserLog, logErrorToSentry, setUserLog } from '../lib/logUtils';
import { ColumnContainer, SpaceBetweenRowContainer } from '../styled/shared';

function DrawerContent(props) {
  const [customer, setCustomer] = React.useState(null);
  const [link, _] = React.useState('http://tiny.cc/RewardsFeedback');
  const [logoutIsLoading, setLogoutIsLoading] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const logout = async () => {
    // Show the loading indicator
    setLogoutIsLoading(true);
    await Analytics.logEvent('logout', {
      is_guest: true,
      redirect_to: 'PhoneNumber',
    });
    // Delay to make sure the event is logged
    const delay = (duration) =>
      new Promise((resolve) => setTimeout(resolve, duration));
    await delay(1500);
    clearUserLog();
    await AsyncStorage.clear();
    props.navigation.dispatch(
      CommonActions.reset({
        routes: [
          {
            name: 'Auth',
            params: {
              screen: 'Onboarding',
            },
          },
          {
            name: 'Auth',
            params: {
              screen: 'PhoneNumber',
            },
          },
        ],
      })
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchUser = async () => {
        try {
          const customerId = await AsyncStorage.getItem('customerId');
          let cust = null;
          if (customerId != null) {
            cust = await getCustomersById(customerId);
          } else {
            cust = { name: 'Guest' };
          }
          if (isActive) {
            setUserLog(cust);
            if (cust.name === 'Guest') {
              Sentry.captureMessage('Guest Login Successful');
              Analytics.logEvent('drawer_load', {
                purpose: 'Guest Login Successful',
              });
            } else {
              Sentry.captureMessage('Returning User');
              Analytics.logEvent('drawer_load', {
                purpose: 'Returning User',
              });
            }
            setCustomer(cust);
            setIsLoading(false);
          }
        } catch (err) {
          console.error('[DrawerContent] Airtable:', err);
          logErrorToSentry({
            screen: 'DrawerContent',
            action: 'componentDidMount',
            error: err,
          });
          Alert.alert('Session Expired', 'Refresh the app and log in again.', [
            { text: 'OK', onPress: () => logout() },
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
          {isGuest && (
            <Subtitle style={{ color: Colors.lightText }}>
              Log in to start saving with Healthy Rewards
            </Subtitle>
          )}
        </ColumnContainer>
      </View>
      <ButtonContainer
        style={{ paddingLeft: 24, paddingVertical: 13 }}
        onPress={() => {
          props.navigation.goBack();
          setTimeout(
            () =>
              props.navigation.navigate('Stores', { screen: 'RewardsOverlay' }),
            700
          );
        }}>
        <Title>Healthy Rewards</Title>
      </ButtonContainer>
      <DrawerItemList {...props} />
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
          verticalAlign: 'bottom',
          paddingBottom: 20,
        }}>
        <ButtonContainer
          style={{ paddingLeft: 24, paddingVertical: 13 }}
          onPress={() => WebBrowser.openBrowserAsync(link)}>
          <Subtitle style={{ height: 30 }}>Submit feedback</Subtitle>
        </ButtonContainer>
      </View>
    </View>
  );
}

export default DrawerContent;

DrawerContent.propTypes = {
  navigation: PropTypes.object.isRequired,
};
