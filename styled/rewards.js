import { PixelRatio, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../constants/Colors';

export const RewardsCardContainer = styled.View`
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 10px;
  margin: 6px 12px 6px 4px;

  flex-direction: row;
  background-color: ${Colors.lightestGreen};
`;

export const HowItWorksContainer = styled.View`
  flex-direction: ${PixelRatio.getFontScale() < 1.2 ? 'row' : 'column'};
  align-items: ${PixelRatio.getFontScale() < 1.2 ? 'center' : 'flex-start'};
  margin-bottom: ${PixelRatio.getFontScale() < 1.2 ? '12px' : '32px'};
  width: 100%;
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
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export const styles = StyleSheet.create({
  tabView: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: Colors.primaryGreen,
    elevation: 7,
    borderBottomWidth: 0,
    height: 50,
    shadowColor: Colors.bgDark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    justifyContent: 'flex-end',
  },
  tabBarLabel: {
    color: Colors.lightText,
    textTransform: 'capitalize',
    fontSize: 16,
    fontFamily: 'poppins-medium',
    paddingLeft: 6,
    paddingRight: 6,
  },
  tabBarIndicator: {
    backgroundColor: Colors.lightText,
    height: 2,
    borderRadius: 10,
  },
});
