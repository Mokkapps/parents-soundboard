import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Tts from 'react-native-tts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeaderButtons, {
  HeaderButton,
  Item
} from 'react-navigation-header-buttons';

import I18n from '../../i18n/i18n';
import SoundList from '../SoundList';
import AdBanner from '../AdBanner';
import {
  storeData,
  retrieveData,
  AVAILABLE_SOUNDS_STORAGE_KEY
} from '../../asyncStorage';

const HeaderButtonComp = props => (
  <HeaderButton
    {...props}
    IconComponent={MaterialIcons}
    iconSize={25}
    color="black"
  />
);

class StartScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const isPlaying = navigation.getParam('isPlaying', false);
    const editMode = navigation.getParam('editMode', false);
    const setEditMode = navigation.getParam('setEditMode', undefined);
    return {
      title: I18n.t('APP_TITLE'),
      headerRight: (
        <HeaderButtons HeaderButtonComponent={HeaderButtonComp}>
          <Item
            title="Mute"
            show={!isPlaying}
            iconName="volume-mute"
            onPress={() => Tts.stop()}
          />
          <Item
            title="Add Sound"
            show={!editMode}
            iconName="add"
            onPress={() => this.addNewSound(navigation.props)}
          />
          <Item
            title="Edit"
            iconName={editMode ? 'save' : 'edit'}
            onPress={() => setEditMode(!editMode)}
          />
          <Item
            title="Settings"
            iconName="settings"
            onPress={() => navigation.navigate('Settings')}
          />
        </HeaderButtons>
      )
    };
  };

  constructor() {
    super();

    const defaultSounds = I18n.t('SOUNDS');

    retrieveData(AVAILABLE_SOUNDS_STORAGE_KEY)
      .then(storedData =>
        this.props.setAvailableSounds(
          storedData !== undefined ? storedData : defaultSounds
        )
      )
      .catch(error => {
        console.error('Failed fetching available sounds:', error);
        this.props.setAvailableSounds(defaultSounds);
      });
  }

  componentWillMount() {
    const { editMode, isPlaying, setEditMode } = this.props;
    this.props.navigation.setParams({ isPlaying, editMode, setEditMode });
  }

  componentWillUpdate(nextProps) {
    const { editMode, isPlaying, setEditMode } = nextProps;
    if (nextProps.navigation.getParam('isPlaying', false) !== isPlaying) {
      this.props.navigation.setParams({ isPlaying });
    }
    if (nextProps.navigation.getParam('editMode', false) !== editMode) {
      this.props.navigation.setParams({ editMode });
    }
    if (
      nextProps.navigation.getParam('setEditMode', undefined) !== setEditMode
    ) {
      this.props.navigation.setParams({ setEditMode });
    }
  }

  addNewSound = ({ availableSounds, setAvailableSounds }) => {
    const lastIdInArr = availableSounds[availableSounds.length - 1].id;
    const id = lastIdInArr + 1;
    const newSounds = [
      ...availableSounds,
      { id, text: I18n.t('PLACEHOLDER_TEXT') }
    ];

    setAvailableSounds(newSounds);
    storeData(JSON.stringify(newSounds), AVAILABLE_SOUNDS_STORAGE_KEY);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SoundList />
        <AdBanner />
      </View>
    );
  }
}

const mapStateToProps = ({ isPlaying, editMode }) => ({
  isPlaying,
  editMode
});

const mapDispatchToProps = dispatch => {
  return {
    setAvailableSounds: availableSounds =>
      dispatch({ type: 'SET_AVAILABLE_SOUNDS', payload: { availableSounds } }),
    setEditMode: editMode =>
      dispatch({ type: 'SET_EDIT_MODE', payload: { editMode } })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartScreen);
