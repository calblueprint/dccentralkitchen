import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { NavButton } from '../../components/BaseComponents';
import ResourceCard from '../../components/resources/ResourceCard';
import ResourceCategoryBar from '../../components/resources/ResourceCategoryBar';
import { getAllResources } from '../../lib/airtable/request';
import { TopText } from '../../styled/resources';

class ResourcesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DCCentralKitchenResources: [],
      CommunityResources: [],
      GovernmentResources: [],
      ResourcesForSeniors: []
    };
  }

  async componentDidMount() {
    try {
      const resources = await getAllResources();
      const DCCentralKitchenResources = resources.filter(
        resource => resource.category == 'DC Central Kitchen Resources'
      );
      const CommunityResources = resources.filter(
        resource => resource.category == 'Community Resources'
      );
      const GovernmentResources = resources.filter(
        resource => resource.category == 'Government Resources'
      );
      const ResourcesForSeniors = resources.filter(
        resource => resource.category == 'Resources for Seniors'
      );
      this.setState({
        DCCentralKitchenResources,
        CommunityResources,
        GovernmentResources,
        ResourcesForSeniors
      });
    } catch (err) {
      console.error('[ResourcesScreen] Airtable: ', err);
    }
  }

  render() {
    return (
      <View>
        <NavButton onPress={() => this.props.navigation.goBack(null)}>
          <FontAwesome5 name="arrow-left" solid size={24} />
        </NavButton>

        <View style={{ height: 106 }}>
          <TopText>Resources</TopText>
        </View>
        <ScrollView>
          <ResourceCategoryBar icon="carrot" title="DC Central Kitchen" />
          {this.state.DCCentralKitchenResources.map(resource => (
            <ResourceCard
              key={resource.id}
              resourceCard={resource}
              navigation={this.props.navigation}
            />
          ))}
          <ResourceCategoryBar icon="heart" title="Community" />
          {this.state.CommunityResources.map(resource => (
            <ResourceCard
              key={resource.id}
              resourceCard={resource}
              navigation={this.props.navigation}
            />
          ))}
          <ResourceCategoryBar icon="balance-scale" title="Government" />
          {this.state.GovernmentResources.map(resource => (
            <ResourceCard
              key={resource.id}
              resourceCard={resource}
              navigation={this.props.navigation}
            />
          ))}
          <ResourceCategoryBar icon="user" title="Seniors" />
          {this.state.ResourcesForSeniors.map(resource => (
            <ResourceCard
              key={resource.id}
              resourceCard={resource}
              navigation={this.props.navigation}
            />
          ))}
          <View style={{ paddingBottom: 100 }} />
        </ScrollView>
      </View>
    );
  }
}

ResourcesScreen.navigationOptions = {
  headerShown: false
};

export default ResourcesScreen;
