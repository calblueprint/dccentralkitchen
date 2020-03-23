import React from 'react';
import { TopText } from '../../styled/resources';
import { TouchableOpacity, ScrollView, View, Button } from 'react-native';
import getResources from '../../lib/resourceUtils';
import ResourceCard from '../../components/resources/ResourceCard';
import { Title, NavButton } from '../../components/BaseComponents';
import ResourceCategoryBar from '../../components/resources/ResourceCategoryBar';
import { FontAwesome5 } from '@expo/vector-icons';

class ResourcesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: [],
      DCCentralKitchenResources: [],
      CommunityResources: [],
      GovernmentResources: [],
      ResourcesForSeniors: []
    };
  }

  async componentDidMount() {
    getResources().then(resources => {
      (DCCentralKitchenResources = resources.filter(
        resource => resource.category == 'DC Central Kitchen Resources'
      )),
        (CommunityResources = resources.filter(
          resource => resource.category == 'Community Resources'
        )),
        (GovernmentResources = resources.filter(
          resource => resource.category == 'Government Resources'
        )),
        (ResourcesForSeniors = resources.filter(
          resource => resource.category == 'Resources for Seniors'
        )),
        this.setState({
          DCCentralKitchenResources,
          CommunityResources,
          GovernmentResources,
          ResourcesForSeniors
        });
    });
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
          <View style={{ paddingBottom: 100 }}></View>
        </ScrollView>
      </View>
    );
  }
}

ResourcesScreen.navigationOptions = {
  headerShown: false
};

export default ResourcesScreen;
