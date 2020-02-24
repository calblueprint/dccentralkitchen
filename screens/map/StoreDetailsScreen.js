import React from 'react';
import { View } from 'react-native';
import StoreInfo from '../../components/store/StoreInfo';

class StoreDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { currentStore } = this.props.navigation.state.params;
    return (
      <View>
        <StoreInfo store={currentStore} />
      </View>
    );
  }
}

export default StoreDetailsScreen;
