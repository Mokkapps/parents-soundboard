import React from 'react';
import { Button, TouchableOpacity, Text, View, TextInput } from 'react-native';
import styled from 'styled-components';

const SoundItem = styled.View`
  width: 100px;
  height: 100px;
  background-color: #333333;
  margin: 5px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const StyledText = styled.Text`
  color: white;
`;

const StyledTextInput = styled.TextInput`
  color: white;
`;

export default (SoundCard = ({
  sound,
  editMode,
  playSound,
  onTextChange,
  removeSound
}) => (
  <TouchableOpacity onPress={() => playSound(sound)}>
    <SoundItem>
      <View>
        {editMode ? (
          <Button title="X" color="red" onPress={() => removeSound(sound)} />
        ) : null}
        {editMode ? (
          <StyledTextInput onChangeText={text => onTextChange(text, sound.id)}>
            {sound.text}
          </StyledTextInput>
        ) : (
          <StyledText>{sound.text}</StyledText>
        )}
      </View>
    </SoundItem>
  </TouchableOpacity>
));
