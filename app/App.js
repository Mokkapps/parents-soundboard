import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import styled from 'styled-components';

import reducer from './reducer';
import Home from './components/Home';

const StyledView = styled.View`
  background-color: #fff;
  flex: 1;
`;

const store = createStore(reducer);

const Stack = createStackNavigator({
  Home: { screen: Home }
});

export default () => (
  <Provider store={store}>
    <StyledView>
      <Stack />
    </StyledView>
  </Provider>
);
