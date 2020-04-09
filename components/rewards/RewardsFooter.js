import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import Colors from '../../constants/Colors';
import { Subhead } from '../BaseComponents';
/**
 * @prop
 * */

function RewardsFooter({ customer, isGuest }) {
  // const points = parseInt(customer.points);
  let string1 = '';
  let string2 = 'Your next reward >';
  if (customer) {
    string1 = `${customer.points} points`;
    if (isGuest) {
      string1 = 'Learn about healthy rewards >';
      string2 = '';
    }
    return (
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 16,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <FontAwesome5 name="star" solid size={16} color={Colors.lightest} />
          <Subhead style={{ paddingLeft: 8 }} color={Colors.lightest}>
            {string1}
          </Subhead>
        </View>
        <Subhead color={Colors.lightest}>{string2}</Subhead>
      </View>
    );
  }
  return null;
}

RewardsFooter.propTypes = {
  customer: PropTypes.object,
  isGuest: PropTypes.bool,
};

RewardsFooter.defaultProps = {
  customer: null,
  isGuest: true,
};

export default RewardsFooter;
