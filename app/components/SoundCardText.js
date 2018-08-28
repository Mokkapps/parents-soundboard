import React from 'react';
import { TextInput } from 'react-native';

export default ({ onTextChange, sound }) => (
  <TextInput
    multiline
    numberOfLines={2}
    maxLength={50}
    style={{
      textAlign: 'center',
      width: 'auto',
      height: 'auto',
      color: 'black'
    }}
    onChangeText={text => onTextChange(text, sound.id)}
  >
    {sound.text}
  </TextInput>
);
