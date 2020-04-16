import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import Colors from '../../constants/Colors';
import { displayDollarValue } from '../../lib/common';
import { ContentContainer, TransactionCard } from '../../styled/transaction';
import { Caption, Subhead } from '../BaseComponents';
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
          <Subhead>{`${pointsEarned} points earned`}</Subhead>
          <Caption color={Colors.secondaryText}>
            {`for ${displayDollarValue(totalSale || 0)} of healthy products`}
          </Caption>
        </ContentContainer>
      </TransactionCard>

      {/* Display rewards applied */}
      {[...Array(rewardsApplied).keys()].map(() => (
        <TransactionCard>
          <CircleIcon
            icon="star"
            iconColor={Colors.primaryOrange}
            circleColor={Colors.lightestOrange}
          />
          <ContentContainer>
            <Caption color={Colors.secondaryText}>
              {`${date.toLocaleDateString('en-US', options)} • ${storeName}`}
            </Caption>
            <Subhead>{`$5 reward redeemed`}</Subhead>
          </ContentContainer>
        </TransactionCard>
      ))}

      {/* Display rewards unlocked */}
      {[...Array(rewardsUnlocked).keys()].map(() => (
        <TransactionCard>
          <CircleIcon
            icon="star"
            iconColor={Colors.primaryGreen}
            circleColor={Colors.lightestGreen}
          />
          <ContentContainer>
            <Caption color={Colors.secondaryText}>
              {`${date.toLocaleDateString('en-US', options)} • ${storeName}`}
            </Caption>
            <Subhead>{`$5 reward unlocked`}</Subhead>
            <Caption color={Colors.secondaryText}>
              {`for 500 earned points`}
            </Caption>
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
