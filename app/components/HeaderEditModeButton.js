import React from 'react';
import { Icon } from 'react-native-elements';
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
    underlayColor="transparent"
  />
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditModeButton);
