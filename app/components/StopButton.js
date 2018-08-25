import React from 'react';
import { Button } from 'react-native-elements';
import Tts from 'react-native-tts';
import { connect } from 'react-redux';

const mapStateToProps = ({ isPlaying }) => ({
  isPlaying
});

const StopButton = ({ isPlaying }) =>
  isPlaying ? <Button onPress={() => Tts.stop()} title="Stop" /> : null;

export default (ConnectedStopButton = connect(
  mapStateToProps,
  null
)(StopButton));
