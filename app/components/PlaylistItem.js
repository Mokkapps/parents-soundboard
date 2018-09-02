import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { COLORS } from '../constants';

export default ({ text, testID }) => (
  <TouchableOpacity testID={testID}>
    <Text
      testID="PlaylistScreen_PlaylistItem_Text"
      style={{
        margin: 10,
        padding: 5,
        textAlign: 'center',
        fontSize: 17,
        backgroundColor: COLORS.LIGHT_GRAY,
        color: 'black'
      }}
    >
      {text}
    </Text>
  </TouchableOpacity>
);
