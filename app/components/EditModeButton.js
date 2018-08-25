import React from 'react';
import { Button } from 'react-native-elements';
import Tts from 'react-native-tts';
import { connect } from 'react-redux';

const mapStateToProps = ({ editMode }) => ({
  editMode
});

const mapDispatchToProps = dispatch => {
  return {
    setEditMode: editMode =>
      dispatch({ type: 'SET_EDIT_MODE', payload: { editMode } })
  };
};

const EditModeButton = ({ editMode, setEditMode }) => (
  <Button
    onPress={() => setEditMode(!editMode)}
    title={editMode ? 'Start Edit' : 'Stop Edit'}
  />
);

export default (ConnectedEditModeButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditModeButton));
