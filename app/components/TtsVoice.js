import React from 'react';
import { Text, Platform, TouchableOpacity } from 'react-native';

import { COLORS } from '../constants';

const getText = id => {
  if (Platform.OS === 'ios') {
    return id;
  }
  return id;
};

export default ({ onPress, id }) => (
  <TouchableOpacity onPress={() => onPress(id)}>
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
      {getText(id)}
    </Text>
  </TouchableOpacity>
);
