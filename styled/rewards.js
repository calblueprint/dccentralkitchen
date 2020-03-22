import { Platform, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Subhead, Caption, NavButton } from '../components/BaseComponents';
import Colors from '../assets/Colors';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const BackButton = styled(NavButton)`
  background-color: ${Colors.primaryGreen};
  border-color: ${Colors.primaryGreen};
`;

export const ScrollViewContainer = styled.ScrollView.attrs(props => ({
  contentContainerStyle: {
    paddingTop: 30
  }
}))`
  flex: 1;
  background-color: #fff;
`;

export const RewardsCardContainer = styled.View`
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 9px;
  width: 159px;
  height: 64px;
  padding: 10px;
  margin-right: 24px;
  flex-direction: row;
  margin-bottom: 12px;
  background-color: ${Colors.lightestGreen};
`;

export const StarIcon = styled.View`
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  background-color: #fff;
  flex-direction: row;
`;

export const RewardDescriptionContainer = styled.View`
  flex-direction: column;
  margin-left: 8px;
`;

export const RewardsProgressContainer = styled.View`
  margin: 1% 5%;
  flex-direction: column;
`;

export const AvailiableRewardsContainer = styled.View`
  margin: 1% 5%;
  display: flex
  width: 100%
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export const ContentText = styled(Subhead)``;

export const ContentText2 = styled(Caption)``;

export const RewardsTitle = styled.View`
  font-size: 17px;
  font-weight: bold;
  color: rgba(13, 99, 139, 0.8);
  line-height: 24px;
  text-align: center;
`;
export const TopTab = styled.View`
  position: absolute;
  height: 190px;
  top: 0px;
  background-color: ${Colors.primaryGreen};
  flexdirection: row;
  width: 100%;
  font-size: 30px;
  align-items: flex-end;
`;
// TODO @anniero98 figure out how to pass styles to third-party components (TabView, TabBar)
export const StyledTabView = styled.View`
  flex: 1;
  margin-top: 150px;
`;

export const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    marginTop: 150
  },
  tabBar: {
    backgroundColor: '#008550',
    elevation: 0,
    borderBottomWidth: 0,
    height: 50
  },
  tabBarLabel: {
    color: 'white',
    textTransform: 'capitalize',
    fontSize: 16,
    fontWeight: 'bold'
  },
  tabBarIndicator: {
    backgroundColor: '#fff',
    height: 2.5
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 150,
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
  navigationFilename: {
    marginTop: 5
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    paddingVertical: 20
  }
});
