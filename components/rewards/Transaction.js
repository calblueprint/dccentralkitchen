import PropTypes from 'prop-types';
import React from 'react';
import Colors from '../../constants/Colors';
import { displayDollarValue } from '../../lib/common';
import { ContentContainer, TransactionCard } from '../../styled/transaction';
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
    day: 'numeric',
  };
  return (
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
  );
}

Transaction.propTypes = {
  date: PropTypes.object.isRequired,
  storeName: PropTypes.array,
  pointsEarned: PropTypes.number,
  totalSale: PropTypes.number,
};

Transaction.defaultProps = {
  storeName: null,
  pointsEarned: 0,
  totalSale: 0,
};

export default Transaction;
