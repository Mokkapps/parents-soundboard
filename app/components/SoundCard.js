import React from 'react';
import { Text, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import styled from 'styled-components';

import { COLORS } from '../constants';

const SoundItem = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  background-color: ${COLORS.LIGHT_GRAY};
  margin: 5px;
  border-radius: 5px;
  position: relative;
  align-content: center;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default ({ sound, editMode, playSound, onTextChange, removeSound }) => (
  <SoundItem onPress={() => playSound(sound)}>
    {editMode ? (
      <TextInput onChangeText={text => onTextChange(text, sound.id)}>
        {sound.text}
      </TextInput>
    ) : (
      <Text>{sound.text}</Text>
    )}
    {editMode ? (
      <Icon
        containerStyle={{
          height: 25,
          width: 25,
          position: 'absolute',
          right: 0,
          top: -12,
          left: -15,
          bottom: 0
        }}
        raised
        underlayColor="transparent"
        name="clear"
        color="red"
        onPress={() => removeSound(sound)}
      />
    ) : null}
  </SoundItem>
);
