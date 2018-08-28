import React from 'react';
import { Text, Platform, TouchableOpacity } from 'react-native';

import { COLORS } from '../constants';

const getText = voice => {
  if (Platform.OS === 'ios') {
    let voiceName = '';

    if (!voice.name) {
      try {
        const regex = new RegExp(/^com\.apple\.ttsbundle\.(.*)-compact$/g);
        console.log('voice regex', regex.exec(voice.id));
        voiceName = regex.exec(voice.id)[1];
      } catch (e) {
        console.log('Could not match name from ID', voice.id);
      }
    } else {
      voiceName = voice.name;
    }

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
