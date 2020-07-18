import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { ButtonLabel, Title } from '../BaseComponents';

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
      <View style={{ display: 'flex' }}>
        <Title style={{ marginBottom: 16 }}>Frequently Asked Questions</Title>
        <AutoHeightWebView
          style={{ width: Dimensions.get('window').width - 32 }}
          source={{
            uri: 'http://localhost:8080/faq-mini.html',
          }}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
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
          More Healthy Corners FAQs
        </ButtonLabel>
      </View>
    </ScrollView>
  );
}

export default React.memo(RewardsFAQ);
