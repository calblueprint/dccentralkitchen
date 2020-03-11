import { Platform, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

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
  font-size: 17px;
  font-weight: bold;
  color: rgba(13, 99, 139, 0.8);
  line-height: 24px;
  text-align: center;
`;
export const TopTab = styled.View`
  position: absolute;
  height: 200px;
  top: 0px;
  background-color: #008550;
  align-self: stretch;
  width: 100%;
  font-size: 30px;
  align-items: center;
  justify-content: center;
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
  },

  progressBar: {
    height: 20,
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 1
  }
});
