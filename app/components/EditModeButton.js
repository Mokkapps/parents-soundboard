import React from 'react';
import { Icon } from 'react-native-elements';
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
  <Icon
    name={editMode ? 'save' : 'edit'}
    onPress={() => setEditMode(!editMode)}
  />
);

export default (ConnectedEditModeButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditModeButton));
