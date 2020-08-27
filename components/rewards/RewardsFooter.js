/* eslint-disable no-nested-ternary */
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import Colors from '../../constants/Colors';
import RecordIds from '../../constants/RecordIds';
import { rewardPointValue } from '../../constants/Rewards';
import { getCustomersById } from '../../lib/airtable/request';
import { logErrorToSentry } from '../../lib/logUtils';
import { Subtitle } from '../BaseComponents';

/**
 * @prop
 * */

export default function RewardsFooter() {
  const [isGuest, setGuest] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [rewards, setRewards] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchUser = async () => {
        try {
          const customerId = await AsyncStorage.getItem('customerId');
          const guest = customerId === RecordIds.guestCustomerId;
          try {
            const cust = await getCustomersById(customerId);
            const rew = customer
              ? Math.floor(parseInt(customer.points, 10) / rewardPointValue)
              : 0;
            if (isActive) {
              setGuest(guest);
              setCustomer(cust);
              setRewards(rew);
            }
          } catch (err) {
            console.error(err);
            logErrorToSentry({
              screen: 'RewardsFooter',
              action: 'useFocusEffect',
              error: err,
            });
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
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
      }}>
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
    </View>
  );
}
