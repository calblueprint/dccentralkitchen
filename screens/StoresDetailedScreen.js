import React from 'react';
import { View } from 'react-native';

import StoreInfo from '../components/StoreInfo';

class StoresDetailedScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const currentStore = this.props.navigation.state.params.currentStore;
    return (
      <View>
        <StoreInfo store={currentStore} />
      </View>
    );
  }
}

export default StoresDetailedScreen;
