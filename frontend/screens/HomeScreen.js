import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  Button
} from 'react-native';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
<<<<<<< HEAD
  
=======
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      points: '',
      rewards: [],
      redeemable: {},
      announcements: ''
    };
    this.getUsersRewards = this.getUsersRewards.bind(this)
  }
>>>>>>> a6adfe9... Fixed promise bug, basic homepage working onw
  // Sign out function -- it clears the local storage then navigates
  // to the authentication page.
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

<<<<<<< HEAD
=======
  async componentDidMount() {
    const phoneNumber = await AsyncStorage.getItem('phoneNumber');
    await this.getUser(phoneNumber).then(
      data => {
        if (data) {
          let points = data["fields"]["Points"]
          let rewards = data["fields"]["Rewards"]
          let name = data["fields"]["Name"]
          let rewardRecords = []
          rewards.forEach(id =>  {
            rewardRecords.push(
              new Promise((resolve, reject) => {
                BASE('Rewards').find(id, function(err, record) {
                  if (err) { console.error(err); reject(err); }
                  console.log('Retrieved', record.id);
                  resolve(record)
                })
              })
            )
          })
          console.log(rewardRecords)
          Promise.all(rewardRecords).then(records => {
            this.setState({
              points: points,
              rewards: records,
              name: name
            })
          })
        } else {
          console.error('Error fetching user info')
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  // TODO: @Johnathan merge this with checkforduplicates and make it a
  // helper
  async getUser(phoneNumber) {
    return new Promise((resolve, reject) => {
      BASE('Customers')
        .select({
          maxRecords: 1,
          filterByFormula: `SEARCH("${phoneNumber}", {Phone Number})`
        })
        .eachPage(
          function page(records, fetchNextPage) {
            if (records.length > 0) {
              resolve(records[0]);
            } else {
              resolve('');
            }
            fetchNextPage();
          },
          err => {
            if (err) {
              console.error(err);
              reject(err);
            } 
          }
        );
    });
  }
  
  getUsersRewards(rewardIDArray) {
    let rewardRecords = []
    rewardIDArray.forEach(id =>  {
      rewardRecords.push(
        new Promise((resolve, reject) => {
          BASE('Rewards').find(id, function(err, record) {
            if (err) { console.error(err); reject(err); }
            // console.log('Retrieved', record.id);
            resolve(record)
          });
        })
      )
    console.log(rewardRecords)
    return rewardRecords
    })
    
  }

  async checkAvailableRewards(points) {
    let availableRewards = {}
    return new Promise((resolve, reject) => {
      BASE('Rewards')
        .select({
          filterByFormula: `SEARCH("${phoneNumber}", {Phone Number})`
        })
        .eachPage(
          function page(records, fetchNextPage) {
            records.forEach(record => {
              if (parseInt(record.get('Point Values')) <= points) {
                availableRewards[record.get('Name')] = record.getId()
              }
            resolve(availableRewards)
            })
          },
          err => {
            if (err) {
              console.error(err);
              reject(err);
            } 
          }
        );
    });
  }
  
>>>>>>> a6adfe9... Fixed promise bug, basic homepage working onw
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
<<<<<<< HEAD
            <DevelopmentModeNotice />

            <Text style={styles.getStartedText}>Get started by opening</Text>

=======
            <Text style={styles.getStartedText}> {"Welcome, " + this.state.name}</Text>
>>>>>>> a6adfe9... Fixed promise bug, basic homepage working onw
            <View
              style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
              <MonoText>screens/HomeScreen.js</MonoText>
            </View>

            <Text style={styles.getStartedText}>
              Change this text and your app will automatically reload.
            </Text>
          </View>

          <View style={styles.helpContainer}>
            <Button 
              title="Sign out"
              onPress={this._signOutAsync} 
              style={styles.helpLink}>
            </Button>
          </View>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>
<<<<<<< HEAD
            This is a tab bar. You can edit it in:
          </Text>

          <View
            style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>
              navigation/MainTabNavigator.js
            </MonoText>
          </View>
=======
            Your Rewards:
          </Text>
          { this.state.rewards ? 
            this.state.rewards.map(reward => {
              return(
                <View
                  key={reward.get("Name")}
                  style={[styles.codeHighlightContainer, styles.navigationFilename]}>
                  <MonoText style={styles.codeHighlightText}>
                    {reward.get("Name")}
                  </MonoText>
                </View>
              )
            })
            : ''
          }
          
>>>>>>> a6adfe9... Fixed promise bug, basic homepage working onw
        </View>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 200,
    // marginTop: 20,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
