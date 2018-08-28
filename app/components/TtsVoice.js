import React from 'react';
import { Text, Platform, TouchableOpacity } from 'react-native';

import { COLORS } from '../constants';

const getText = voice => {
  const { name, id, language } = voice;
  if (Platform.OS === 'ios') {
    let voiceName = '';

    if (!name) {
      try {
        const regex = new RegExp(/^com\.apple\.ttsbundle\.(.*)-compact$/g);
        console.log('voice regex', regex.exec(id));
        voiceName = regex.exec(id)[1];
      } catch (e) {
        console.log('Could not match name from ID', id);
      }
    } else {
      voiceName = voice;
    }

    return `${voiceName} (${language})`;
  }
  // Android case
  return voice;
};

export default ({ onPress, voice }) => (
  <TouchableOpacity onPress={() => onPress(voice)}>
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
