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
        <Caption>
          {date.toLocaleDateString('en-US', options)} • {storeName}
        </Caption>
        <Subhead>{pointsEarned} points earned</Subhead>
        <Caption>
          for {displayDollarValue(totalSale ? totalSale : 0)} of healthy
          products
        </Caption>
      </ContentContainer>
    </Card>
  );
}

export default Transaction;
