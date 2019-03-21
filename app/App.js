import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import Tts from 'react-native-tts';

import reducer from './reducer';
import { COLORS } from './constants';
import StartScreen from './components/screens/StartScreen';
import SettingsScreen from './components/screens/SettingsScreen';
import TtsLanguagesScreen from './components/screens/TtsLanguagesScreen';
import PlaylistScreen from './components/screens/PlaylistScreen';

const StyledView = styled.View`
  flex: 1;
`;

const store = createStore(reducer);

const AppNavigator = createStackNavigator(
  {
    Start: { screen: StartScreen },
    Settings: { screen: SettingsScreen },
    TtsLanguages: { screen: TtsLanguagesScreen },
    Playlist: { screen: PlaylistScreen }
  },
  {
    headerMode: 'screen',
    headerLayoutPreset: 'left',
    defaultNavigationOptions: {
      headerTintColor: 'black',
      headerStyle: {
        backgroundColor: COLORS.MOKKAPPS_RED
      }
    },
    cardStyle: { backgroundColor: COLORS.DARK_GRAY }
  }
);

const AppContainer = createAppContainer(AppNavigator);

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
          <AppContainer />
        </StyledView>
      </Provider>
    );
  }
}

export default App;
