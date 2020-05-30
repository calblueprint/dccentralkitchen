import { DrawerItemList } from '@react-navigation/drawer';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Updates } from 'expo';
import * as Analytics from 'expo-firebase-analytics';
import PropTypes from 'prop-types';
import React from 'react';
import { Alert, AsyncStorage, Linking, View } from 'react-native';
import * as Sentry from 'sentry-expo';
import { ButtonContainer, Title } from '../components/BaseComponents';
import Colors from '../constants/Colors';
import { getCustomersById } from '../lib/airtable/request';
import { logErrorToSentry } from '../lib/logUtils';

function DrawerContent(props) {
  const [customer, setCustomer] = React.useState(null);
  const [link, _] = React.useState('http://tiny.cc/RewardsFeedback');
  const [isLoading, setIsLoading] = React.useState(true);
  const navigation = useNavigation();
  const logout = async () => {
    await AsyncStorage.clear();
    Sentry.configureScope((scope) => scope.clear());
    setTimeout(() => {
      navigation.navigate('Auth');
    }, 500);
    props.navigation.closeDrawer();
    Updates.reload();
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
            Analytics.setUserId(customerId);
            Analytics.setUserProperties({
              name: cust.name,
              phoneNumber: cust.phoneNumber,
            });
            Sentry.configureScope((scope) => {
              scope.setUser({
                id: customerId,
                username: cust.name,
                phoneNumber: cust.phoneNumber,
              });
            });
            if (cust.name === 'Guest') {
              Sentry.captureMessage('Guest Login Successful');
              Analytics.logEvent('drawer_load', {
                name: 'Guest Login Successful',
                screen: 'DrawerContent',
              });
            } else {
              Sentry.captureMessage('Returning User');
              Analytics.logEvent('drawer_load', {
                name: 'Returning User',
                screen: 'DrawerContent',
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
          Alert.alert(
            'This account has been removed',
            'You are logged into an account that no longer exists. You must log out and create a new account.',
            [{ text: 'OK', onPress: () => logout() }]
          );
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

  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
      }}>
      <View
        style={{
          backgroundColor: Colors.bgDark,
          height: 114,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          padding: 8,
        }}>
        <Title style={{ color: Colors.lightText }}>{customer.name}</Title>
      </View>
      <DrawerItemList {...props} />
      <ButtonContainer
        style={{ paddingHorizontal: 8, paddingVertical: 13 }}
        onPress={() => {
          props.navigation.goBack();
          props.navigation.navigate('RewardsOverlay');
        }}>
        <Title style={{ height: 30 }}>Rewards</Title>
      </ButtonContainer>
      <ButtonContainer
        style={{ paddingHorizontal: 8, paddingVertical: 13 }}
        onPress={() => Linking.openURL(link)}>
        <Title style={{ height: 30 }}>Feedback</Title>
      </ButtonContainer>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
          verticalAlign: 'bottom',
        }}>
        <ButtonContainer
          style={{ paddingLeft: 16, paddingBottom: 21 }}
          onPress={() => logout()}>
          <Title>Log Out</Title>
        </ButtonContainer>
      </View>
    </View>
  );
}

export default DrawerContent;

DrawerContent.propTypes = {
  navigation: PropTypes.object.isRequired,
};
