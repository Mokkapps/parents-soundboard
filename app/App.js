import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import styled from 'styled-components';

import reducer from './reducer';
import { COLORS } from './constants';
import StartScreen from './components/StartScreen';
import AboutScreen from './components/AboutScreen';

const StyledView = styled.View`
  flex: 1;
`;

const store = createStore(reducer);

const Stack = createStackNavigator(
  {
    Start: { screen: StartScreen },
    About: { screen: AboutScreen }
  },
  {
    headerMode: 'screen',
    navigationOptions: {
      headerTintColor: 'black'
    },
    cardStyle: { backgroundColor: COLORS.DARK_GRAY }
  }
);

export default () => (
  <Provider store={store}>
    <StyledView>
      <Stack />
    </StyledView>
  </Provider>
);
