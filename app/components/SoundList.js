import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
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
  color: white;
  font-size: 20;
  text-align: center;
`;

const styles = StyleSheet.create({
  flatContainer: {
    margin: 10
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

  playSound = sound => {
    const { setIsPlaying } = this.props;
    Tts.speak(sound.text);
    setIsPlaying(true);
  };

  onTextChange = (text, id) => {
    const newSound = { text, id };
    const { availableSounds } = this.props;
    const newAvailableSounds = availableSounds.map(s => {
      const sound = { ...s };
      if (sound.id === newSound.id) {
        sound.text = newSound.text;
      }
      return sound;
    });

    this.updateAvailableSounds(newAvailableSounds);
  };

  renderItem = ({ item, index }) => {
    const { editMode } = this.props;
    return (
      <SoundCard
        index={index}
        sound={item}
        editMode={editMode}
        playSound={this.playSound}
        onTextChange={this.onTextChange}
        removeSound={this.removeSound}
      />
    );
  };

  removeSound = sound => {
    const { availableSounds } = this.props;
    const filteredAvailableSounds = availableSounds.filter(
      s => s.id !== sound.id
    );

    this.updateAvailableSounds(filteredAvailableSounds);
  };

  updateAvailableSounds = availableSounds => {
    const { setAvailableSounds } = this.props;
    setAvailableSounds(availableSounds);
    storeData(JSON.stringify(availableSounds), AVAILABLE_SOUNDS_STORAGE_KEY);
  };

  render() {
    const { editMode, availableSounds, testID } = this.props;
    return (
      <SoundsView testID={testID}>
        {editMode ? (
          <DescriptionText testID="StartScreen_EditModeDescriptionText">
            {I18n.t('EDIT_MODE_DESC')}
          </DescriptionText>
        ) : null}
        <FlatList
          keyExtractor={item => item.id}
          data={availableSounds}
          extraData={this.props}
          renderItem={this.renderItem}
          contentContainerStyle={styles.flatContainer}
          horizontal={false}
          numColumns={3}
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
