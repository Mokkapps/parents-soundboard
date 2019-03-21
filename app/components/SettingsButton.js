import React from 'react';
import { Button } from 'react-native-elements';
import { COLORS } from '../constants';

export default ({ title, onPress, testID }) => (
  <Button
    testID={testID}
    small
    raised
    buttonStyle={{ backgroundColor: COLORS.LIGHT_GRAY }}
    color="black"
    containerStyle={{ marginTop: 10 }}
    title={title}
    onPress={() => onPress()}
  />
);
