import React from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import styled from 'styled-components';
import Tts from 'react-native-tts';
import { connect } from 'react-redux';

import I18n from '../i18n/i18n';
import SoundCard from './SoundCard';
import { storeData, AVAILABLE_SOUNDS_STORAGE_KEY } from '../asyncStorage';

const SoundsView = styled.View`
  flex: 1;
  margin-bottom: 10px;
`;

const DescriptionText = styled.Text`
  margin: 5px;
  font-size: 20;
  text-align: center;
`;

const styles = StyleSheet.create({
  flatContainer: {
    margin: 5
  }
});

class SoundList extends React.Component {
  constructor() {
    super();

    Tts.addEventListener('tts-start', event => console.log('TTS start', event));
    Tts.addEventListener('tts-finish', event => {
      console.log('TTS finish', event);
      this.props.setIsPlaying(false);
    });
    Tts.addEventListener('tts-cancel', event => {
      console.log('TTS cancel', event);
      this.props.setIsPlaying(false);
    });
  }

  _playSound = sound => {
    Tts.speak(sound.text);
    this.props.setIsPlaying(true);
  };

  _onTextChange = (text, id) => {
    const newSound = { text, id };
    const { availableSounds } = this.props;
    const newAvailableSounds = availableSounds.map(s => {
      if (s.id === newSound.id) {
        s.text = newSound.text;
      }
      return s;
    });

    this._setAvailableSounds(newAvailableSounds);
  };

  _renderItem = ({ item }) => {
    const { editMode } = this.props;
    return (
      <SoundCard
        sound={item}
        editMode={editMode}
        playSound={this._playSound}
        onTextChange={this._onTextChange}
        removeSound={this._removeSound}
      />
    );
  };

  _removeSound = sound => {
    const { availableSounds } = this.props;
    const filteredAvailableSounds = availableSounds.filter(
      s => s.id !== sound.id
    );

    this._setAvailableSounds(filteredAvailableSounds);
  };

  _setAvailableSounds = availableSounds => {
    this.props.setAvailableSounds(availableSounds);
    storeData(JSON.stringify(availableSounds), AVAILABLE_SOUNDS_STORAGE_KEY);
  };

  render() {
    const { editMode, availableSounds } = this.props;
    return (
      <SoundsView>
        {editMode ? (
          <DescriptionText>{I18n.t('editModeDesc')}</DescriptionText>
        ) : null}
        <FlatList
          keyExtractor={(item, index) => item.id}
          data={availableSounds}
          extraData={this.props}
          renderItem={this._renderItem}
          contentContainerStyle={styles.flatContainer}
          horizontal={false}
          numColumns={3}
          removeClippedSubviews={true}
        />
      </SoundsView>
    );
  }
}

const mapStateToProps = ({ editMode, availableSounds }) => ({
  editMode,
  availableSounds
});

const mapDispatchToProps = dispatch => {
  return {
    setIsPlaying: isPlaying =>
      dispatch({ type: 'SET_IS_PLAYING', payload: { isPlaying } }),
    setAvailableSounds: availableSounds =>
      dispatch({ type: 'SET_AVAILABLE_SOUNDS', payload: { availableSounds } })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SoundList);
