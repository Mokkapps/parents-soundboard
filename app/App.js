import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

import reducer from './reducer';
import Welcome from './components/Welcome';
import Home from './components/Home';

const store = createStore(reducer);

const Stack = createStackNavigator({
  Welcome: { screen: Welcome },
  Home: { screen: Home }
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Stack />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
