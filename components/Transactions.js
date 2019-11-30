import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
        <View>
          <View>
            <Text>
                {this.props.date.toLocaleDateString()}
            </Text>
          </View>
          <View>
            <Text> {this.props.points} </Text>
            <Text> {this.props.storeId} </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
