import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
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

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <StyledView>
          <Stack />
        </StyledView>
      </Provider>
    );
  }
}
