import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import AlertAsync from 'react-native-alert-async';
import { Switch } from 'react-native-paper';
import {
  Body,
  ButtonLabel,
  FilledButtonContainer,
  NavButtonContainer,
  NavHeaderContainer,
  NavTitle,
  Subtitle,
} from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
import { getCustomerById, updateCustomer } from '../../lib/airtable/request';
import { logErrorToSentry } from '../../lib/logUtils';
import { ContentContainer, ResourceItemCard } from '../../styled/resources';

export default function NotificationsScreen(props) {
  const { navigation } = props;
  const [notifications, setNotifications] = useState(false);
  const [deliveryAlerts, setDeliveryAlerts] = React.useState(false);
  const [notifsChanged, setNotifsChanged] = useState(false);
  const [deliveryChanged, setDeliveryChanged] = useState(false);

  const onToggleNotifications = () => {
    setNotifications(!notifications);
    setNotifsChanged(!notifsChanged);
  };

  const onToggleDeliveryAlerts = () => {
    setDeliveryAlerts(!deliveryAlerts);
    setDeliveryChanged(!deliveryChanged);
  };

  const saveNotificationsSettings = async () => {
    try {
      const customerId = await AsyncStorage.getItem('customerId');
      await updateCustomer(customerId, {
        notifications: deliveryAlerts,
      });
      await navigation.goBack();
    } catch (err) {
      console.error(
        '[NotificationsScreen] (saveNotificationsSettings) Airtable:',
        err
      );
      logErrorToSentry({
        screen: 'NotificationsScreen',
        action: 'saveNotificationsSettings',
        error: err,
      });
    }
  };

  const confirmExit = async () => {
    let exit = true;
    if (deliveryChanged || notifsChanged) {
      exit = await AlertAsync(
        'You have unsaved changes',
        '',
        [
          {
            text: 'Discard changes',
            onPress: () => true,
            style: 'destructive',
          },
          {
            text: 'Cancel',
            onPress: () => false,
            style: 'cancel',
          },
        ],
        { cancelable: false }
      );
    }
    if (exit) {
      props.navigation.goBack();
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchUser = async () => {
        try {
          const customerId = await AsyncStorage.getItem('customerId');
          if (isActive && customerId != null) {
            const customer = await getCustomerById(customerId);
            setDeliveryAlerts(customer.notifications);
          }
        } catch (err) {
          console.error('[NotificationsScreen] Airtable:', err);
          logErrorToSentry({
            screen: 'NotificationsScreen',
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
      <NavHeaderContainer withMargin>
        <NavButtonContainer onPress={async () => confirmExit()}>
          <FontAwesome5 name="arrow-left" solid size={24} />
        </NavButtonContainer>
        <NavTitle>Notifications</NavTitle>
      </NavHeaderContainer>
      <ScrollView>
        <ResourceItemCard>
          <ContentContainer>
            <Subtitle color={Colors.activeText}>Delivery Alerts</Subtitle>
            <Body color={Colors.secondaryText}>
              Get a text message when your favorite stores get new products
              delivered.
            </Body>
          </ContentContainer>
          <Switch
            style={{ marginLeft: 4 }}
            value={deliveryAlerts}
            onValueChange={onToggleDeliveryAlerts}
            color={Colors.primaryGreen}
          />
        </ResourceItemCard>
        <ResourceItemCard>
          <ContentContainer>
            <Subtitle color={Colors.activeText}>Discounts and News</Subtitle>
            <Body color={Colors.secondaryText}>
              Special offers, recommendations, store updates, and more.
            </Body>
          </ContentContainer>
          <Switch
            style={{ marginLeft: 4 }}
            value={notifications}
            onValueChange={onToggleNotifications}
            color={Colors.primaryGreen}
          />
        </ResourceItemCard>
      </ScrollView>
      <View
        style={{
          paddingHorizontal: 24,
          paddingBottom: 24,
        }}>
        {(notifsChanged || deliveryChanged) && (
          <FilledButtonContainer onPress={() => saveNotificationsSettings()}>
            <ButtonLabel color={Colors.lightText}>Save Changes</ButtonLabel>
          </FilledButtonContainer>
        )}
      </View>
    </View>
  );
}

NotificationsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
