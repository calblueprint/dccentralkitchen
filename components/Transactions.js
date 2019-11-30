import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, IconContainer, ContentContainer, MainText, Overline } from '../styles/transactions';

export default class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionRecord: null,
      date: null,
      store: '',
      rewardPoints: 0
    };
  }

  render() {
    return (
      <TouchableOpacity>
        <Card>
          <IconContainer>

          </IconContainer>
          <ContentContainer>
            <Overline>{this.props.date.toLocaleDateString()} @ {this.props.storeId}</Overline>
            <MainText>{this.props.points} Points Redeemed</MainText>
          </ContentContainer>
        </Card>
      </TouchableOpacity>
    );
  }
}
