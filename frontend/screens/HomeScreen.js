import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Button
} from 'react-native';

import { MonoText } from '../components/StyledText';
import { BASE } from '../lib/common';


export default class HomeScreen extends React.Component {
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
  // Sign out function -- it clears the local storage then navigates
  // to the authentication page.
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  async componentDidMount() {
    const userId = await AsyncStorage.getItem('userId');
    console.log(userId)
    await this.getUser(userId).then(
      data => {
        if (data) {
          let points = data["fields"]["Points"]
          let rewards = data["fields"]["Rewards"]
          let name = data["fields"]["Name"]
          let rewardRecords = []
          if (rewards) {
            rewards.forEach(id =>  {
              rewardRecords.push(
                new Promise((resolve, reject) => {
                  BASE('Rewards').find(id, function(err, record) {
                    if (err) { console.error(err); reject(err); }
                    console.log('Retrieved', record.id);
                    // console.log('Retrieved', record.id);
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
            this.setState({
              points: points,
              name: name
            })
          }
          
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
  async getUser(id) {
    // return new Promise((resolve, reject) => {
    //   BASE('Customers')
    //     .select({
    //       maxRecords: 1,
    //       filterByFormula: `SEARCH("${phoneNumber}", {Phone Number})`
    //     })
    //     .eachPage(
    //       function page(records, fetchNextPage) {
    //         if (records.length > 0) {
    //           resolve(records[0]);
    //         } else {
    //           resolve('');
    //         }
    //         fetchNextPage();
    //       },
    //       err => {
    //         if (err) {
    //           console.error(err);
    //           reject(err);
    //         } 
    //       }
    //     );
    // });
    return new Promise((resolve, reject) => {
      BASE('Customers').find(id, function(err, record) {
        if (err) { console.error(err); reject(err); }
        console.log('Retrieved', record.id);
        console
        resolve(record)
      });
    })
  }
  
  getUsersRewards(rewardIDArray) {
    // let rewardRecords = []
    // return new Promise((resolve, reject) => {
    //   rewardIDArray.forEach((id) =>  {
    //     BASE('Rewards').find(id, function(err, record) {
    //       if (err) { console.error(err); reject(err); }
    //       console.log('Retrieved', record.id);
    //       rewardRecords.push(record)
    //     });
    //   console.log(rewardRecords)
    //   resolve(rewardRecords)
    //   })
    // })
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
  
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
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
            <Text style={styles.getStartedText}> {"Welcome, " + this.state.name}</Text>
            <View
              style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
              <MonoText>{this.state.points} / 1000 </MonoText>
            </View>
            <Text style={styles.getStartedText}> {1000 - parseInt(this.state.points) + " points to your next reward"}</Text>
           
          </View>

          <View style={styles.signOutContainer}>
            <Button
              title="Sign out"
              onPress={this._signOutAsync}
              style={styles.signOutButton}
            ></Button>
          </View>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>
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
          
        </View>
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
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
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
