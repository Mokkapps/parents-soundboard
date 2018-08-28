import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';

import { COLORS } from '../constants';
import SoundCardRemoveIcon from './SoundCardRemoveIcon';
import SoundCardText from './SoundCardText';

const SoundItem = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  background-color: ${COLORS.LIGHT_GRAY};
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
  position: relative;
  text-align: center;
  align-content: center;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default ({ sound, editMode, playSound, onTextChange, removeSound }) => (
  <SoundItem disabled={editMode} onPress={() => playSound(sound)}>
    {editMode ? (
      <SoundCardText
        sound={sound}
        onTextChange={onTextChange}
      />
    ) : (
      <Text style={{ textAlign: 'center', color: 'black' }}>{sound.text}</Text>
    )}
    {editMode ? (
      <SoundCardRemoveIcon sound={sound} removeSound={removeSound} />
    ) : null}
  </SoundItem>
);
