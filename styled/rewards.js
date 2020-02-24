import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const ScrollViewContainer = styled.ScrollView.attrs(props => ({
  contentContainerStyle: {
    paddingTop: 30
  }
}))`
  flex: 1;
  background-color: #fff;
`;

export const RewardsTitle = styled.View`
  font-size: 17;
  font-weight: bold;
  color: rgba(13, 99, 139, 0.8);
  line-height: 24;
  text-align: center;
`;
export const TopTab = styled.View`
  position: absolute;
  height: 200;
  top: 0;
  background-color: #008550;
  align-self: stretch;
  width: 100%;
  font-size: 30;
  align-items: center;
  justify-content: center;
`;
// TODO @anniero98 figure out how to pass styles to third-party components (TabView, TabBar)
export const StyledTabView = styled.View`
  flex: 1;
  margin-top: 150;
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
  }
});
