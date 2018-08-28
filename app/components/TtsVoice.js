import React from 'react';
import { Text, Platform, TouchableOpacity } from 'react-native';

import { COLORS } from '../constants';

const getText = voice => {
  if (Platform.OS === 'ios') {
    const regex = new RegExp(/^com\.apple\.ttsbundle\.(.*)-compact$/g);
    const voiceName = regex.exec(voice.id)[1];
    return `${voiceName} (${voice.language})`;
  }
  return voice.id;
};

export default ({ onPress, voice }) => (
  <TouchableOpacity onPress={() => onPress(voice.id)}>
    <Text
      style={{
        margin: 10,
        padding: 5,
        textAlign: 'center',
        fontSize: 17,
        backgroundColor: COLORS.LIGHT_GRAY,
        color: 'black'
      }}
    >
      {getText(voice)}
    </Text>
  </TouchableOpacity>
);
