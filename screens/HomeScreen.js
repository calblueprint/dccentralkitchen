import React from 'react';
import { AsyncStorage, Button, Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import { MonoText } from '../components/StyledText';
import BASE from '../lib/common';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      points: ''
    };
  }

  async componentDidMount() {
    const userId = await AsyncStorage.getItem('userId');
    HomeScreen.getUser(userId)
      .then(async userRecord => {
        if (userRecord) {
          const name = userRecord.fields.Name;
          const points = userRecord.fields.Points;
          await this.setState({
            name,
            points
          });
        } else {
          console.error('User data is undefined or empty.');
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  // Calls Airtable API to return a promise that
  // will resolve to be a user record.
  static async getUser(id) {
    return BASE('Customers').find(id);
  }

  // Sign out function -- it clears the local storage then navigates
  // to the authentication page.
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  // // Calls Airtable API to returna promise that
  // // will resolve to be an array of records that
  // // require less than the given number points to
  // // redeem.
  // async checkAvailableRewards(points) {
  //   return BASE('Rewards')
  //     .select({
  //       filterByFormula: `{Point Values} <= ${points}`
  //     })
  //     .firstPage();
  // }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>
              {' '}
              {`Welcome, ${this.state.name}`}
            </Text>
            <View
              style={[
                styles.codeHighlightContainer,
                styles.homeScreenFilename
              ]}>
              <MonoText>{this.state.points} / 1000 </MonoText>
            </View>
            <Text style={styles.getStartedText}>
              {' '}
              {`${1000 -
                parseInt(this.state.points)} points to your next reward`}
            </Text>
          </View>

          <View style={styles.signOutContainer}>
            <Button
              title="Sign out"
              onPress={this._signOutAsync}
              style={styles.signOutButton}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    return <Text style={styles.developmentModeText}>~development mode~</Text>;
  }
  return (
    <Text style={styles.developmentModeText}>
      You are not in development mode: your app will run at full speed.
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center'
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50
  },
  helloTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'rgba(13, 99, 139, 0.8)',
    lineHeight: 24,
    textAlign: 'center'
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 150,
    // marginTop: 20,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20
  },
  tabBarInfoContainer2: {
    position: 'absolute',
    bottom: 300,
    // marginTop: 20,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20
  },
  helloMessage: {
    paddingVertical: 10,
    fontSize: 15.5,
    fontWeight: '600',
    color: 'rgba(30, 183, 255, 0.8)',
    lineHeight: 20,
    textAlign: 'left'
  },
  navigationFilename: {
    marginTop: 5
  },
  signOutContainer: {
    marginTop: 20,
    alignItems: 'center'
  },
  signOutButton: {
    fontSize: 20,
    paddingVertical: 15
  }
});
