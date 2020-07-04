import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Question } from '../../styled/rewards';
import { Body, ButtonLabel, Title } from '../BaseComponents';

/**
 * @prop
 * */

function RewardsFAQ() {
  return (
    <ScrollView
      style={{
        display: 'flex',
        marginLeft: 16,
        paddingRight: 16,
        marginTop: 24,
        marginBottom: 100,
      }}>
      <View style={{ display: 'flex', maxHeight: 1750 }}>
        <Title style={{}}>Healthy Rewards FAQs</Title>
        <Question>
          Who can use Healthy Rewards? Do I have to receive SNAP/EBT to qualify?
        </Question>
        <Body>
          Anyone can use Healthy Rewards! You do not have to use SNAP/EBT to
          qualify. Just sign up for an account in the Healthy Corners app to
          start earning points at participating stores.
        </Body>
        <Question>Do I have to pay a membership fee?</Question>
        <Body>
          The Healthy Rewards program is free. Just use your registered phone
          number at checkout in a participating Healthy Corners store to earn
          points.
        </Body>
        <Question>
          What is the difference between Healthy Rewards and SNAP matching?
        </Question>
        <Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris
        </Body>
        <ButtonLabel
          textAlign="left"
          noCaps
          underline
          style={{ marginTop: 24 }}
          onPress={() =>
            WebBrowser.openBrowserAsync(
              'https://healthycorners.calblueprint.org/faq.html'
            )
          }>
          More Healthy Rewards FAQs
        </ButtonLabel>
      </View>
    </ScrollView>
  );
}

export default React.memo(RewardsFAQ);
