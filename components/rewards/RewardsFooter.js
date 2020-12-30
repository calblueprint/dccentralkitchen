/* eslint-disable no-nested-ternary */
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { View } from 'react-native';
import Colors from '../../constants/Colors';
import Window from '../../constants/Layout';
import RecordIds from '../../constants/RecordIds';
import { rewardPointValue } from '../../constants/Rewards';
import { getCustomerById } from '../../lib/airtable/request';
import { logErrorToSentry } from '../../lib/logUtils';
import { ButtonContainer, Subtitle } from '../BaseComponents';

/**
 * @prop
 * */

export default function RewardsFooter({ navigation }) {
  const [customer, setCustomer] = useState(null);
  const rewards = customer
    ? Math.floor(parseInt(customer.points, 10) / rewardPointValue)
    : 0;
  const isGuest = customer && customer.id === RecordIds.guestCustomerId;

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchUser = async () => {
        try {
          const customerId = await AsyncStorage.getItem('customerId');
          const cust = await getCustomerById(customerId);
          if (isActive) {
            setCustomer(cust);
          }
        } catch (err) {
          console.error('[RewardsFooter] Airtable:', err);
          logErrorToSentry({
            screen: 'RewardsFooter',
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
    <ButtonContainer
      style={{
        bottom: 0,
        width: Window.width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 100,
        padding: 16,
        height: 70,
        elevation: 5,
        backgroundColor: Colors.primaryGreen,
      }}
      onPress={() => navigation.navigate('RewardsOverlay')}>
      {customer && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <FontAwesome5 name="star" solid size={16} color={Colors.lightText} />
          <Subtitle
            style={{ paddingLeft: 8 }}
            color={Colors.lightText}
            maxFontSizeMultiplier={1.3}>
            {isGuest
              ? 'Learn about Healthy Rewards >'
              : rewards === 1
              ? `${rewards} reward`
              : rewards > 0
              ? `${rewards} rewards`
              : customer.points === 1
              ? `${customer.points} point`
              : `${customer.points || 0} points`}
          </Subtitle>
        </View>
      )}
      {customer && !isGuest && (
        <Subtitle maxFontSizeMultiplier={1.2} color={Colors.lightText}>
          {rewards > 0 ? `View your rewards >` : `View your points >`}
        </Subtitle>
      )}
    </ButtonContainer>
  );
}

RewardsFooter.propTypes = {
  navigation: PropTypes.object.isRequired,
};
