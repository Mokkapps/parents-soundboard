import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import styled from 'styled-components';
import Tts from 'react-native-tts';
import { connect } from 'react-redux';

import I18n from '../i18n/i18n';
import SoundCard from './SoundCard';
import SettingsButton from './SettingsButton';
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

    Tts.addEventListener('tts-finish', event => {
      this.updatePlaylist(event.utteranceId);
    });

    Tts.addEventListener('tts-cancel', event => {
      this.updatePlaylist(event.utteranceId);
    });
  }

  updatePlaylist = (id, text) => {
    const { setPlaylist, playlist } = this.props;

    let newPlaylist = [...playlist];

    if (text) {
      newPlaylist.push({ id, text });
    } else {
      const isIdInPlaylist = newPlaylist.findIndex(p => p.id === id) !== -1;
      if (isIdInPlaylist) {
        newPlaylist = newPlaylist.filter(entry => entry.id !== id);
      }
    }

    setPlaylist(newPlaylist);
  };

  playSound = sound => {
    Tts.speak(sound.text).then(id => {
      this.updatePlaylist(id, sound.text);
    });
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
    const { editMode, availableSounds, testID, isPlaying, navigation } = this.props;
    return (
      <SoundsView testID={testID}>
        {isPlaying ? (
          <SettingsButton
            onPress={() => navigation.navigate('Playlist')}
            title="Show Playlist"
          />
        ) : null}
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

const mapStateToProps = ({
  editMode,
  availableSounds,
  playlist,
  isPlaying
}) => ({
  editMode,
  isPlaying,
  availableSounds,
  playlist
});

const mapDispatchToProps = dispatch => {
  return {
    setAvailableSounds: availableSounds =>
      dispatch({ type: 'SET_AVAILABLE_SOUNDS', payload: { availableSounds } }),
    setPlaylist: playlist =>
      dispatch({ type: 'SET_PLAYLIST', payload: { playlist } })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SoundList);
