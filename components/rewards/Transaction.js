import React from 'react';
import Colors from '../../assets/Colors';
import { displayDollarValue } from '../../lib/rewardsUtils';
import { Card, ContentContainer } from '../../styled/transaction';
import { Caption, Subhead } from '../BaseComponents';
import CircleIcon from '../CircleIcon';

/**
 * @prop
 * */

function Transaction(props) {
  const { date, storeName, pointsEarned, totalSale } = props;
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  return (
    <Card>
      <CircleIcon
        icon="check"
        iconColor={Colors.primaryGreen}
        circleColor={Colors.lightestGreen}
      />
      <ContentContainer>
        <Caption color={Colors.secondaryText}>
          {date.toLocaleDateString('en-US', options)} • {storeName}
        </Caption>
        <Subhead>{pointsEarned} points earned</Subhead>
        <Caption color={Colors.secondaryText}>
          for {displayDollarValue(totalSale ? totalSale : 0)} of healthy
          products
        </Caption>
      </ContentContainer>
    </Card>
  );
}

export default Transaction;
