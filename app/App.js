import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import Tts from 'react-native-tts';

import reducer from './reducer';
import { COLORS } from './constants';
import StartScreen from './components/screens/StartScreen';
import SettingsScreen from './components/screens/SettingsScreen';
import TtsLanguagesScreen from './components/screens/TtsLanguagesScreen';

const StyledView = styled.View`
  flex: 1;
`;

const store = createStore(reducer);

const Stack = createStackNavigator(
  {
    Start: { screen: StartScreen },
    Settings: { screen: SettingsScreen },
    TtsLanguages: { screen: TtsLanguagesScreen }
  },
  {
    headerMode: 'screen',
    navigationOptions: {
      headerTintColor: 'black',
      headerStyle: {
        backgroundColor: COLORS.MOKKAPPS_RED
      }
    },
    cardStyle: { backgroundColor: COLORS.DARK_GRAY }
  }
);

class App extends React.Component {
  constructor() {
    super();

    // Enable lowering other applications output level while speaking (also referred to as "ducking")
    Tts.setDucking(true);

    // https://github.com/ak1394/react-native-tts#no-text-to-speech-engine-installed-on-android
    Tts.getInitStatus().then(
      () => console.log('TTS initialized'),
      err => {
        if (err.code === 'no_engine') {
          Tts.requestInstallEngine();
        }
      }
    );
  }

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

export default App;
