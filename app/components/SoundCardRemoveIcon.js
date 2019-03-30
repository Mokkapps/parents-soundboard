import React from 'react';
import { Platform } from 'react-native';
import { Icon } from 'react-native-elements';

export default ({ testID, removeSound, sound }) => (
  <Icon
    testID={testID}
    containerStyle={{
      position: 'absolute',
      right: 0,
      top: Platform.OS === 'android' ? -10 : -13,
      left: Platform.OS === 'android' ? -10 : -15,
      bottom: 0
    }}
    raised
    underlayColor="transparent"
    name="clear"
    color="red"
    size={15}
    onPress={() => removeSound(sound)}
  />
);
