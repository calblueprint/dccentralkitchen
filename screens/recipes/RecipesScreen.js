import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { FAB, Searchbar } from 'react-native-paper';
import {
  NavButtonContainer,
  NavHeaderContainer,
  NavTitle,
} from '../../components/BaseComponents';
import CategoryBar from '../../components/recipes/CategoryBar';
import RecipeCard from '../../components/recipes/RecipeCard';
import { getAllRecipes } from '../../lib/airtable/request';
import { logErrorToSentry } from '../../lib/logUtils';

export default class RecipesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      allRecipes: [],
      search: '',
    };
  }

  async componentDidMount() {
    try {
      const recipes = await getAllRecipes();
      this.setState({ recipes, allRecipes: recipes });
    } catch (err) {
      logErrorToSentry({
        screen: 'RecipesScreen',
        action: 'componentDidMount',
        error: err,
      });
    }
  }

  updateSearch = async (search) => {
    const { allRecipes } = this.state;
    const filteredSearch = allRecipes.filter((recipe) =>
      recipe.title.includes(search)
    );
    this.setState({ search, recipes: filteredSearch });
  };

  render() {
    return (
      <View>
        <View>
          <NavHeaderContainer>
            <NavButtonContainer
              onPress={() => this.props.navigation.toggleDrawer()}>
              <FontAwesome5 name="bars" solid size={24} />
            </NavButtonContainer>
            <NavTitle>Recipes</NavTitle>
          </NavHeaderContainer>
          <Searchbar
            placeholder="Search"
            iconColor="blue"
            onChangeText={this.updateSearch}
            value={this.state.search}
          />
          <View style={styles.listView}>
            <ScrollView style={styles.listContainer}>
              <FlatList
                contentContainerStyle={styles.list}
                data={this.state.recipes}
                renderItem={({ item }) => (
                  <RecipeCard navigation={this.props.navigation} item={item} />
                )}
                renderSectionHeader={({ section }) =>
                  section.data.length > 0 ? (
                    <CategoryBar icon={section.icon} title={section.category} />
                  ) : null
                }
                ListFooterComponent={<View style={{ height: 200 }} />}
              />
            </ScrollView>
          </View>
        </View>
        <View style={styles.container}>
          <FAB
            style={styles.container}
            small
            icon="plus"
            onPress={() => console.log('Pressed')}
          />
        </View>
      </View>
    );
  }
}

RecipesScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  listView: {
    height: '100%',
    width: '100%',
    flexGrow: 1,
    paddingBottom: 300,
    justifyContent: 'flex-start',
    elevation: 1,
  },
  listContainer: {
    height: '100%',
    width: '100%',
    flexGrow: 1,
    // justifyContent: 'flex-end',
    elevation: 1,
  },
  list: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    // paddingBottom: 50,
  },
  container: {
    position: 'absolute',
    elevation: 100,
    left: 20,
    flex: 1,
    height: 100,
    width: 100,
    bottom: 20,
  },
  fab: {
    backgroundColor: 'green',
    height: '100%',
    width: '100%',
  },
});
