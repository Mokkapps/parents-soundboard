import React from 'react';
import { Text, Platform, TouchableOpacity } from 'react-native';

import { COLORS } from '../constants';
import I18n from '../i18n/i18n';

const LOCALES = I18n.t('LOCALES');

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

    console.log('Voice name', voiceName);

    return `${voiceName.name} (${LOCALES[language] || language})`;
  }
  // Android case where we show only language code
  return LOCALES[voice];
};

export default ({ onPress, voice, testID }) => (
  <TouchableOpacity testID={testID} onPress={() => onPress(voice)}>
    <Text
      testID="TtsLanguagesScreen_LanguageItem_Text"
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
