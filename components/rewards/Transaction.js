import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Card,
  ContentContainer,
  IconContainer
} from '../../styled/transaction';
import { Caption, Body } from '../../components/BaseComponents';

/**
 * @prop
 * */

function Transaction(props) {
  const { date, storeName, points } = props;
  return (
    <TouchableOpacity>
      <Card>
        <IconContainer>
          <FontAwesome name="check" size={32} color="green" />
        </IconContainer>
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
