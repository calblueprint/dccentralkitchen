import React from 'react';
import { TopText } from '../../styled/resources';
import { TouchableOpacity, ScrollView, View, Button } from 'react-native';
import getResources from '../../lib/resourceUtils';
import { Title } from '../../components/BaseComponents';
import ResourceCard from '../../components/resources/ResourceCard';

function filterCategory(resource, category) {
  return resource.category == category;
}

class ResourceScreen extends React.Component {
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
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            width: 50,
            height: 50,
            zIndex: 100,
            position: 'absolute', // comment out this line to see the menu toggle
            top: 50,
            left: 15,
            borderRadius: 23,
            borderColor: '#ffffff',
            borderWidth: 4,
            shadowOpacity: 0.25,
            shadowRadius: 5,
            shadowColor: 'black',
            shadowOffset: { height: 3, width: 4 }
          }}>
          <Button
            color="black"
            title="X"
            onPress={() => this.props.navigation.goBack(null)}
          />
        </TouchableOpacity>

        <TopText> Resources </TopText>

        <ScrollView>
          <Title>DC Central Kitchen Resources</Title>
          {this.state.DCCentralKitchenResources.map(resource => (
            <ResourceCard
              key={resource.id}
              resourceCard={resource}
              navigation={this.props.navigation}
            />
          ))}
          <Title>Community Resources</Title>
          {this.state.CommunityResources.map(resource => (
            <ResourceCard
              key={resource.id}
              resourceCard={resource}
              navigation={this.props.navigation}
            />
          ))}
          <Title>Government Resources</Title>
          {this.state.GovernmentResources.map(resource => (
            <ResourceCard
              key={resource.id}
              resourceCard={resource}
              navigation={this.props.navigation}
            />
          ))}
          <Title>Resources for Seniors</Title>
          {this.state.ResourcesForSeniors.map(resource => (
            <ResourceCard
              key={resource.id}
              resourceCard={resource}
              navigation={this.props.navigation}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

ResourceScreen.navigationOptions = {
  headerShown: false
};

export default ResourceScreen;
