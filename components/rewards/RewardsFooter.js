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
          <FontAwesome5 name="star" solid size={16} color={Colors.lightest} />
          <Subhead style={{ paddingLeft: 8 }} color={Colors.lightest}>
            {isGuest
              ? 'Learn about healthy rewards >'
              : `${customer.points} points`}
          </Subhead>
        </View>
      )}
      {customer && !isGuest && (
        <Subhead color={Colors.lightest}>Your next reward ></Subhead>
      )}
    </View>
  );
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
