import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../constants/Colors';

export const RewardsCardContainer = styled.View`
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 9px;
  width: 159px;
  height: 64px;
  padding: 10px;
  margin-right: 12px;
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

export const GuestCardContainer = styled.View`
  padding: 10px;
  flex-direction: row;
  justify-content: center;
`;

export const GuestIconContainer = styled.View`
  flex-direction: column;
  justify-content: space-evenly;
`;

export const GuestDescriptionContainer = styled.View`
  flex-direction: column;
  justify-content: space-evenly;
`;

export const AvailableRewardsContainer = styled.View`
  margin: 8px 0;
  display: flex
  width: 100%
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export const styles = StyleSheet.create({
  tabView: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: Colors.primaryGreen,
    elevation: 2,
    borderBottomWidth: 0,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    justifyContent: 'flex-end',
  },
  tabBarLabel: {
    color: Colors.lightest,
    textTransform: 'capitalize',
    fontSize: 16,
    fontFamily: 'poppins-medium',
    paddingLeft: 6,
    paddingRight: 6,
  },
  tabBarIndicator: {
    backgroundColor: Colors.lightest,
    height: 2,
    borderRadius: 10,
  },
});
