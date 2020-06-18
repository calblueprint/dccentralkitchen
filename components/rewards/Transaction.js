import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import Colors from '../../constants/Colors';
import { rewardDollarValue, rewardPointValue } from '../../constants/Rewards';
import { displayDollarValue } from '../../lib/common';
import { ContentContainer, TransactionCard } from '../../styled/transaction';
import { Caption, Subtitle } from '../BaseComponents';
import CircleIcon from '../CircleIcon';

/**
 * @prop
 * */

function Transaction(props) {
  const {
    date,
    storeName,
    pointsEarned,
    totalSale,
    rewardsUnlocked,
    rewardsApplied,
  } = props;
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return (
    <View>
      {/* Display rewards unlocked */}
      {[...Array(rewardsUnlocked).keys()].map((i) => (
        <TransactionCard key={i}>
          <CircleIcon
            icon="star"
            iconColor={Colors.primaryGreen}
            circleColor={Colors.lightestGreen}
          />
          <ContentContainer>
            <Caption color={Colors.secondaryText}>
              {`${date.toLocaleDateString('en-US', options)} • ${storeName}`}
            </Caption>
            <Subtitle>{`$${rewardDollarValue} reward unlocked`}</Subtitle>
            <Caption color={Colors.secondaryText}>
              {`for ${rewardPointValue} earned points`}
            </Caption>
          </ContentContainer>
        </TransactionCard>
      ))}

      {/* Display points earned */}
      <TransactionCard>
        <CircleIcon
          icon="check"
          iconColor={Colors.primaryGreen}
          circleColor={Colors.lightestGreen}
        />
        <ContentContainer>
          <Caption color={Colors.secondaryText}>
            {`${date.toLocaleDateString('en-US', options)} • ${storeName}`}
          </Caption>
          <Subtitle>{`${pointsEarned} points earned`}</Subtitle>
          <Caption color={Colors.secondaryText}>
            {`for ${displayDollarValue(totalSale || 0)} of healthy products`}
          </Caption>
        </ContentContainer>
      </TransactionCard>

      {/* Display rewards applied */}
      {[...Array(rewardsApplied).keys()].map((i) => (
        <TransactionCard key={i}>
          <CircleIcon
            icon="star"
            iconColor={Colors.primaryOrange}
            circleColor={Colors.lightestOrange}
          />
          <ContentContainer>
            <Caption color={Colors.secondaryText}>
              {`${date.toLocaleDateString('en-US', options)} • ${storeName}`}
            </Caption>
            <Subtitle>{`$${rewardDollarValue} reward redeemed`}</Subtitle>
          </ContentContainer>
        </TransactionCard>
      ))}
    </View>
  );
}

Transaction.propTypes = {
  date: PropTypes.object.isRequired,
  storeName: PropTypes.array,
  pointsEarned: PropTypes.number,
  totalSale: PropTypes.number,
  rewardsUnlocked: PropTypes.number,
  rewardsApplied: PropTypes.number,
};

Transaction.defaultProps = {
  storeName: null,
  pointsEarned: 0,
  totalSale: 0,
  rewardsUnlocked: null,
  rewardsApplied: 0,
};

export default Transaction;
