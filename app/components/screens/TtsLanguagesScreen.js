import React from 'react';
import { Platform, FlatList } from 'react-native';
import Toast from 'react-native-easy-toast';
import Tts from 'react-native-tts';
import styled from 'styled-components';

import TtsVoice from '../TtsVoice';
import I18n from '../../i18n/i18n';

const CUSTOM_DURATION = 750;

const StyledView = styled.View`
  margin: 5px;
`;

class TtsLanguagesScreen extends React.Component {
  static navigationOptions = {
    title: I18n.t('TTS_LANGUAGE_SCREEN_TITLE')
  };

  state = {
    voices: []
  };

  componentWillMount() {
    Tts.voices().then(voices => {
      this.setState({ voices });
    });
  }

  onPress = id => {
    Tts.setDefaultVoice(id)
      .then(() => {
        console.log('DONE');
        this.refs.toast.show(
          `${I18n.t('TTS_LANGUAGE_CHANGE_SUCCESS')} ${id}`,
          CUSTOM_DURATION
        );
      })
      .catch(err => {
        this.refs.toast.show(`${err}`, CUSTOM_DURATION);
      });
  };

  render() {
    let { voices } = this.state;
    console.log('voices', voices);
    if (Platform.OS === 'android') {
      voices = voices.filter(voice => voice.notInstalled === false);
    }
    return (
      <StyledView>
        <FlatList
          keyExtractor={item => item.id}
          data={voices}
          renderItem={({ item }) => (
            <TtsVoice voice={item} onPress={this.onPress} />
          )}
        />
        <Toast ref="toast" position="bottom" positionValue={200} />
      </StyledView>
    );
  }
}

export default TtsLanguagesScreen;
