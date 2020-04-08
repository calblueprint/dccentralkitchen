import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { Subhead } from '../BaseComponents';

/**
 * @prop
 * */

function RewardsFooter({ wdth, customer, isGuest }) {
  // const points = parseInt(customer.points);
  let string1 = '';
  let string2 = 'Your next reward >';
  if (customer) {
    string1 = `${customer.points} points`;
  }
  if (isGuest) {
    string1 = 'Learn about healthy rewards >';
    string2 = '';
  }
  if (customer) {
    return (
      <View
        style={{
          width: wdth,
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 16,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <FontAwesome5 name="star" solid size={16} color="#fff" />
          <Subhead style={{ paddingLeft: 8 }} color="#fff">
            {string1}
          </Subhead>
        </View>
        <Subhead color="#fff">{string2}</Subhead>
      </View>
    );
  }
  return (
    <View
      style={{
        width: wdth,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <FontAwesome5 name="star" solid size={16} color="#fff" />
      </View>
    </View>
  );
}

RewardsFooter.propTypes = {
  wdth: PropTypes.number,
  customer: PropTypes.object,
  isGuest: PropTypes.bool,
};

RewardsFooterdefaultProps = {
  wdth: 0,
  customer: null,
  isGuest: true,
};

export default RewardsFooter;
