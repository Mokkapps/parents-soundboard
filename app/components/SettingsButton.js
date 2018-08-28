import React from 'react';
import { Button } from 'react-native-elements';
import { COLORS } from '../constants';

export default ({ title, onPress }) => (
  <Button
    small
    raised
    backgroundColor={COLORS.LIGHT_GRAY}
    color="black"
    containerViewStyle={{ marginTop: 10 }}
    title={title}
    onPress={() => onPress()}
  />
);
