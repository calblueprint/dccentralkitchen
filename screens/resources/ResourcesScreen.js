import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { SectionList, View } from 'react-native';
import {
  NavButtonContainer,
  NavHeaderContainer,
  NavTitle,
} from '../../components/BaseComponents';
import CategoryBar from '../../components/resources/CategoryBar';
import ResourceCard from '../../components/resources/ResourceCard';
import { getAllResources } from '../../lib/airtable/request';
import { logErrorToSentry } from '../../lib/logUtils';

export default class ResourcesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: [],
    };
  }

  async componentDidMount() {
    try {
      const resources = await getAllResources();
      const sections = [];

      // Category titles and their FontAwesome5 Icons
      const categories = {
        'Crisis Response': 'exclamation-triangle',
        'Food Access': 'utensils',
        'Healthy Cooking & Eating': 'carrot',
        Seniors: 'user',
        'Social Services': 'hands-helping',
      };

      Object.entries(categories).forEach(([category, icon]) => {
        sections.push({
          category,
          icon,
          data: resources.filter(
            (resource) =>
              resource.category && resource.category.includes(category)
          ),
        });
      });

      // Resources without a matching category are considered Miscellaneous
      const Miscellaneous = resources.filter(
        (resource) =>
          !resource.category ||
          (resource.category &&
            !resource.category.some((element) => element in categories))
      );
      sections.push({
        category: 'Miscellaneous',
        icon: 'book-open',
        data: Miscellaneous,
      });

      this.setState({ sections });
    } catch (err) {
      console.error('[ResourcesScreen] Airtable: ', err);
      logErrorToSentry({
        screen: 'ResourcesScreen',
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
          <NavTitle>Resources</NavTitle>
        </NavHeaderContainer>
        <SectionList
          sections={this.state.sections}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ResourceCard
              key={item.id}
              resourceCard={item}
              navigation={this.props.navigation}
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

ResourcesScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
