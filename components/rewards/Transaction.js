import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Card,
  ContentContainer,
  IconContainer,
  MainText,
  Overline
} from '../../styled/transaction';

/**
 * @prop
 * */

function Transaction(props) {
  const { date, storeName, points } = props;
  return (
    <TouchableOpacity>
      <Card>
        <IconContainer>
          <FontAwesome5 name="check" size={32} color="green" />
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

export default Transaction;
