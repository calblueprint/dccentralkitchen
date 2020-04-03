import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { SearchBar } from 'react-native-elements'; // @tommypoa: Create styled-component for this
import { ScrollView } from 'react-native-gesture-handler';
import {
  ButtonLabel,
  NavHeaderContainer,
  Title,
} from '../../components/BaseComponents';
import StoreCard from '../../components/store/StoreCard';
import Colors from '../../constants/Colors';
import { ColumnContainer, RowContainer } from '../../styled/shared';
import { CancelButton, StoreListContainer, styles } from '../../styled/store';

export default class StoreListScreen extends React.Component {
  constructor(props) {
    super(props);
    const { navigation, stores } = this.props.route.params;
    this.state = {
      allStores: stores,
      navigation,
      searchStr: '',
      filteredStores: stores,
    };
  }

  componentDidMount() {
    this.search.focus();
  }

  // TODO @tommypoa or @anniero98 - move this into shared utils with StoreListScreen
  storeDetailsTransition = store => {
    this.state.navigation.navigate('Stores', {
      currentStore: store,
    });
  };

  updateSearch = searchStr => {
    this.setState({
      searchStr,
      filteredStores: this.state.allStores.filter(this.filterStore(searchStr)),
    });
  };

  filterStore(searchStr) {
    return store => {
      return store.name.toLowerCase().includes(searchStr.toLowerCase());
    };
  }

  render() {
    const { searchStr } = this.state;

    return (
      <View>
        <NavHeaderContainer
          style={{ flexDirection: 'column' }}
          backgroundColor={Colors.primaryOrange}>
          <ColumnContainer style={{ width: '100%' }}>
            <RowContainer
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <CancelButton onPress={() => this.props.navigation.goBack()}>
                <ButtonLabel color={Colors.lightest}>Cancel</ButtonLabel>
              </CancelButton>
              <Title color={Colors.lightest} style={{ textAlign: 'center' }}>
                Find a store
              </Title>
            </RowContainer>
            {/* Search bar */}
            <SearchBar
              placeholder="Search by store name"
              onChangeText={this.updateSearch}
              value={searchStr}
              containerStyle={styles.container}
              inputContainerStyle={styles.inputContainer}
              searchIcon={
                <FontAwesome5
                  name="search"
                  size={16}
                  color={Colors.primaryOrange}
                />
              }
              inputStyle={styles.input}
              ref={search => (this.search = search)}
            />
          </ColumnContainer>
        </NavHeaderContainer>
        <StoreListContainer>
          <ScrollView showsVerticalScrollIndicator={false}>
            {this.state.filteredStores.map(store => (
              <StoreCard
                key={store.id}
                store={store}
                callBack={() => this.storeDetailsTransition(store)}
                seeProduct
              />
            ))}
          </ScrollView>
        </StoreListContainer>
      </View>
    );
  }
}
StoreListScreen.navigationOptions = {
  headerShown: false,
};
