import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../assets/Colors';
import { NavButton } from '../components/BaseComponents';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const BackButton = styled(NavButton)`
  background-color: ${Colors.primaryGreen};
  border-color: ${Colors.primaryGreen};
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

export const RewardDescriptionContainer = styled.View`
  flex-direction: column;
  margin-left: 8px;
`;

export const RewardsProgressContainer = styled.View`
  margin: 8px 0;
  flex-direction: column;
`;

export const AvailableRewardsContainer = styled.View`
  margin: 8px 0;
  display: flex
  width: 100%
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export const TopTab = styled.View`
  position: absolute;
  height: 190px;
  top: 0px;
  background-color: ${Colors.primaryGreen};
  flex-direction: row;
  width: 100%;
  align-items: flex-end;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
`;

export const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    marginTop: 140
  },
  tabBar: {
    backgroundColor: Colors.primaryGreen,
    elevation: 0,
    borderBottomWidth: 0,
    height: 50
  },
  tabBarLabel: {
    color: Colors.lightest,
    textTransform: 'capitalize',
    fontSize: 16,
    fontFamily: 'poppins-medium',
    paddingLeft: 4,
    paddingRight: 4
  },
  tabBarIndicator: {
    backgroundColor: Colors.lightest,
    height: 2,
    borderRadius: 10
  }
});
