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

export default ({
  index,
  sound,
  editMode,
  playSound,
  onTextChange,
  removeSound
}) => (
  <SoundItem
    testID={`StartScreen_SoundListItem_${index}`}
    disabled={editMode}
    onPress={() => playSound(sound)}
  >
    {editMode ? (
      <SoundCardText testID={`StartScreen_SoundListItem_${index}_TextInput`} sound={sound} onTextChange={onTextChange} />
    ) : (
      <Text testID={`StartScreen_SoundListItem_${index}_Text`} style={{ textAlign: 'center', color: 'black' }}>{sound.text}</Text>
    )}
    {editMode ? (
      <SoundCardRemoveIcon
        testID={`StartScreen_SoundListItem_${index}_RemoveButton`}
        sound={sound}
        removeSound={removeSound}
      />
    ) : null}
  </SoundItem>
);
