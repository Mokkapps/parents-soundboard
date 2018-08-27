import React from 'react';
import { Icon } from 'react-native-elements';
import Tts from 'react-native-tts';
import { connect } from 'react-redux';

const mapStateToProps = ({ isPlaying }) => ({
  isPlaying
});

const StopButton = ({ isPlaying }) =>
  isPlaying ? <Icon name="volume-mute" onPress={() => Tts.stop()} /> : null;

export default (connect(
  mapStateToProps,
  null
)(StopButton));
