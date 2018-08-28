import React from 'react';
import { Platform } from 'react-native';
import { Icon } from 'react-native-elements';

export default ({ removeSound, sound }) => (
  <Icon
    containerStyle={{
      height: 25,
      width: 25,
      position: 'absolute',
      right: 0,
      top: Platform.OS === 'android' ? -4 : -13,
      left: Platform.OS === 'android' ? -5 : -15,
      bottom: 0
    }}
    raised
    underlayColor="transparent"
    name="clear"
    color="red"
    onPress={() => removeSound(sound)}
  />
);
