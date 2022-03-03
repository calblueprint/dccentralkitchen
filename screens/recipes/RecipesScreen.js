import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { FlatList, View } from 'react-native';
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
    };
  }

  async componentDidMount() {
    try {
      const recipes = await getAllRecipes();
      console.log(recipes[0]);
      console.log('url:', recipes[0].image[0].thumbnails.small.url);
      this.setState({ recipes });
    } catch (err) {
      logErrorToSentry({
        screen: 'RecipesScreen',
        action: 'componentDidMount',
        error: err,
      });
    }
  }

  render() {
    return (
      <View>
        <NavHeaderContainer>
          <NavButtonContainer
            onPress={() => this.props.navigation.toggleDrawer()}>
            <FontAwesome5 name="bars" solid size={24} />
          </NavButtonContainer>
          <NavTitle>Recipes</NavTitle>
        </NavHeaderContainer>
        <FlatList
          data={this.state.recipes}
          renderItem={({ item }) => (
            <RecipeCard
              key={item.id}
              title={item.title}
              description={item.description}
              navigation={this.props.navigation}
              thumbnail={item.image[0].thumbnails.small.url}
              picture={item.image[0].thumbnails.large.url}
            />
          )}
          renderSectionHeader={({ section }) =>
            section.data.length > 0 ? (
              <CategoryBar icon={section.icon} title={section.category} />
            ) : null
          }
          ListFooterComponent={<View style={{ height: 200 }} />}
        />
      </View>
    );
  }
}

RecipesScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
