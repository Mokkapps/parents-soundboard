import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import styled from 'styled-components';

import I18n from '../../i18n/i18n';
import SoundList from '../SoundList';
import StopButton from '../StopButton';
import AddSoundButton from '../AddSoundButton';
import EditModeButton from '../EditModeButton';
import { retrieveData, AVAILABLE_SOUNDS_STORAGE_KEY } from '../../asyncStorage';

const HeaderButtons = styled.View`
  display: flex;
  flex-direction: row;
  margin-right: 10;
`;

class StartScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: I18n.t('APP_TITLE'),
      headerRight: (
        <HeaderButtons>
          <StopButton />
          <AddSoundButton />
          <EditModeButton />
          <Icon
            name="settings"
            onPress={() => navigation.navigate('Settings')}
            underlayColor="transparent"
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

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SoundList />
      </View>
    );
  }
}

const mapStateToProps = ({ isPlaying }) => ({
  isPlaying
});

const mapDispatchToProps = dispatch => {
  return {
    setAvailableSounds: availableSounds =>
      dispatch({ type: 'SET_AVAILABLE_SOUNDS', payload: { availableSounds } })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartScreen);
