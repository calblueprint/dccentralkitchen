import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Body, Caption } from '../../components/BaseComponents';
import { Card, ContentContainer } from '../../styled/transaction';
import CircleIcon from '../CircleIcon';

/**
 * @prop
 * */

function Transaction(props) {
  const { date, storeName, points } = props;
  return (
    <TouchableOpacity>
      <Card>
        <CircleIcon
          icon="check"
          iconColor={Colors.primaryGreen}
          circleColor={Colors.lightestGreen}
        />

        <ContentContainer>
          <Body>
            {date.toLocaleDateString()} @ {storeName}
          </Body>
          <Caption>{points} Points Redeemed</Caption>
        </ContentContainer>
      </Card>
    </TouchableOpacity>
  );
}

export default Transaction;
