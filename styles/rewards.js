import styled from 'styled-components/native';
import { Dimensions, StyleSheet } from 'react-native';


export const Container = styled.View`
    flex: 1,
    backgroundColor: '#fff'
`;
export const ContentContainer = styled.View`
    paddingTop: 30
`;
export const RewardsTitle = styled.View`
    fontSize: 17,
    fontWeight: 'bold',
    color: 'rgba(13, 99, 139, 0.8)',
    lineHeight: 24,
    textAlign: 'center'
`;
export const TabView = styled.View`
    flex: 1,
    marginTop: 150
`;
export const topTab = styled.View`
    position: 'absolute',
    height: 200,
    top: 0,
    backgroundColor: '#008550',
    alignSelf: 'stretch',
    width,
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center'
`;
// TODO @johnathanzhou re-work styles used in rewards screen

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    contentContainer: {
      paddingTop: 30
    },
    rewardsTitle: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'rgba(13, 99, 139, 0.8)',
      lineHeight: 24,
      textAlign: 'center'
    },
    tabView: {
      flex: 1,
      marginTop: 150
    },
    topTab: {
      position: 'absolute',
      height: 200,
      top: 0,
      backgroundColor: '#008550',
      alignSelf: 'stretch',
      width: Dimensions.get('window').width,
      fontSize: 30,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });