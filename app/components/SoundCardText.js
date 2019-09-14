import React from 'react';
import { TextInput } from 'react-native';

export default ({ onTextChange, sound, testID }) => (
  <TextInput
    testID={testID}
    multiline
    numberOfLines={2}
    maxLength={50}
    style={{
      textAlign: 'center',
      width: 'auto',
      height: 'auto',
      color: 'black',
      zIndex: 99
    }}
    onChangeText={text => onTextChange(text, sound.id)}
  >
    {sound.text}
  </TextInput>
);
