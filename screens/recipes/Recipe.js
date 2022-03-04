import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  NavButtonContainer,
  NavHeaderContainer,
  NavTitle,
} from '../../components/BaseComponents';
import { IconContainer } from '../../styled/resources';

const Recipe = (props) => {
  const { item } = props.route.params;
  return (
    <View>
      <NavHeaderContainer>
        <NavButtonContainer
          onPress={() => props.navigation.navigate('Recipes')}>
          <FontAwesome5 name="arrow-left" solid size={24} />
        </NavButtonContainer>
        <NavTitle>Recipes</NavTitle>
      </NavHeaderContainer>
      {/* ! Does not scroll all the way */}
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>{item.title}</Text>
        <IconContainer>
          <Image
            style={styles.bigPicture}
            source={{
              uri: item.image[0].thumbnails.large.url,
            }}
            alt={`${item.title}`}
          />
        </IconContainer>
        <Text style={styles.textContainer}>{item.ingredients}</Text>
        <Text style={styles.textContainer}>{item.instructions}</Text>
      </ScrollView>
    </View>
  );
};

Recipe.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    height: '250%',
    paddingTop: 20,
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
  heading: {
    textAlign: 'center',
    fontSize: 30,
  },
  bigPicture: {
    marginVertical: 20,
    alignItems: 'center',
    width: 200,
    height: 200,
  },
  logo: {
    width: 66,
    height: 58,
  },
  textContainer: {
    marginTop: 20,
    marginHorizontal: 30,
  },
});

export default Recipe;
