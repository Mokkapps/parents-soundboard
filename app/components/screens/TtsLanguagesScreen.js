import React from 'react';
import { Platform, FlatList } from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';
import Tts from 'react-native-tts';
import styled from 'styled-components';

import TtsVoice from '../TtsVoice';
import I18n from '../../i18n/i18n';

const StyledView = styled.View`
  margin: 5px;
`;

class TtsLanguagesScreen extends React.Component {
  static navigationOptions = {
    title: 'TTS Languages'
  };

  state = {
    voices: []
  };

  componentWillMount() {
    Tts.voices().then(voices => {
      console.log('TTS voices', voices);
      this.setState({ voices });
    });
  }

  onPress = id => {
    console.log('Change TTS default voice to', id);
    Tts.setDefaultVoice(id);
    this.refs.toast.show(`${I18n.t('TTS_LANGUAGE_CHANGED')} ${id}`);
  };

  render() {
    let { voices } = this.state;
    if (Platform.OS === 'android') {
      voices = voices.filter(voice => voice.notInstalled === false);
    }
    console.log('render TTS voices', voices);
    return (
      <StyledView>
        <FlatList
          keyExtractor={item => item.id}
          data={voices}
          renderItem={({ item }) => (
            <TtsVoice id={item.id} onPress={this.onPress} />
          )}
        />
        <Toast
          ref="toast"
          position="bottom"
          positionValue={200}
        />
      </StyledView>
    );
  }
}

export default TtsLanguagesScreen;
