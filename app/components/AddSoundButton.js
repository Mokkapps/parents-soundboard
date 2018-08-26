import React from 'react';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import { storeData, AVAILABLE_SOUNDS_STORAGE_KEY } from '../asyncStorage';

const mapStateToProps = ({ editMode, availableSounds }) => ({
  editMode,
  availableSounds
});

const mapDispatchToProps = dispatch => {
  return {
    setAvailableSounds: availableSounds =>
      dispatch({ type: 'SET_AVAILABLE_SOUNDS', payload: { availableSounds } })
  };
};

const addNewSound = ({ availableSounds, setAvailableSounds }) => {
  const lastIdInArr = availableSounds[availableSounds.length - 1].id;
  const id = lastIdInArr + 1;
  const newSounds = [...availableSounds, { id, text: 'TEST' }];

  setAvailableSounds(newSounds);
  storeData(JSON.stringify(newSounds), AVAILABLE_SOUNDS_STORAGE_KEY);
};

const AddSoundButton = props =>
  props.editMode ? (
    <Icon name="add" onPress={() => addNewSound(props)} />
  ) : null;

export default (ConnectedAddSoundButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSoundButton));
