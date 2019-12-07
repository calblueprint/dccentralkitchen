import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {
  Card,
  ContentContainer,
  IconContainer,
  MainText,
  Overline
} from '../styles/transactions';

/**
 * @prop
 * */

function Transactions(props) {
  const { date, storeName, points } = props;
  return (
    <TouchableOpacity>
      <Card>
        <IconContainer>
          <FontAwesome name="check" size={32} color="green" />
        </IconContainer>
        <ContentContainer>
          <Overline>
            {date.toLocaleDateString()} @ {storeName}
          </Overline>
          <MainText>{points} Points Redeemed</MainText>
        </ContentContainer>
      </Card>
    </TouchableOpacity>
  );
}

export default Transactions;
