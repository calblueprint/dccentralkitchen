import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Window from '../../constants/Layout';
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
      <View style={styles.listView}>
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
    </View>
  );
};

Recipe.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  listView: {
    height: Window.height - 120, // calc
    width: '100%',
    flexGrow: 1,
    justifyContent: 'flex-start',
    elevation: 1,
  },
  container: {
    paddingTop: 20,
    paddingBottom: 100,
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
    margin: 20,
  },
});

export default Recipe;
