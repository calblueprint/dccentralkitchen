import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { ScrollView, View } from 'react-native';
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
      CrisisResponse: [],
      Seniors: [],
      Food: [],
      SocialServices: [],
      Miscellaneous: [],
    };
  }

  async componentDidMount() {
    try {
      const resources = await getAllResources();
      const CrisisResponse = resources.filter(
        (resource) => resource.category === 'Crisis Response'
      );
      const Seniors = resources.filter(
        (resource) => resource.category === 'Seniors'
      );
      const Food = resources.filter((resource) => resource.category === 'Food');
      const SocialServices = resources.filter(
        (resource) => resource.category === 'Social Services'
      );
      const Miscellaneous = resources.filter(
        (resource) =>
          resource.category !== 'Crisis Response' &&
          resource.category !== 'Seniors' &&
          resource.category !== 'Food' &&
          resource.category !== 'Social Services'
      );
      this.setState({
        CrisisResponse,
        Seniors,
        Food,
        SocialServices,
        Miscellaneous,
      });
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
        <ScrollView>
          {this.state.CrisisResponse.length > 0 && (
            <CategoryBar icon="exclamation-triangle" title="Crisis Response" />
          )}
          {this.state.CrisisResponse.map((resource) => (
            <ResourceCard
              key={resource.id}
              resourceCard={resource}
              navigation={this.props.navigation}
            />
          ))}
          {this.state.Seniors.length > 0 && (
            <CategoryBar icon="user" title="Seniors" />
          )}
          {this.state.Seniors.map((resource) => (
            <ResourceCard
              key={resource.id}
              resourceCard={resource}
              navigation={this.props.navigation}
            />
          ))}
          {this.state.Food.length > 0 && (
            <CategoryBar icon="carrot" title="Food" />
          )}
          {this.state.Food.map((resource) => (
            <ResourceCard
              key={resource.id}
              resourceCard={resource}
              navigation={this.props.navigation}
            />
          ))}
          {this.state.SocialServices.length > 0 && (
            <CategoryBar icon="hands-helping" title="Social Services" />
          )}
          {this.state.SocialServices.map((resource) => (
            <ResourceCard
              key={resource.id}
              resourceCard={resource}
              navigation={this.props.navigation}
            />
          ))}
          {this.state.Miscellaneous.length > 0 && (
            <CategoryBar icon="book-open" title="Miscellaneous" />
          )}
          {this.state.Miscellaneous.map((resource) => (
            <ResourceCard
              key={resource.id}
              resourceCard={resource}
              navigation={this.props.navigation}
            />
          ))}
          <View style={{ paddingBottom: 150 }} />
        </ScrollView>
      </View>
    );
  }
}

ResourcesScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
