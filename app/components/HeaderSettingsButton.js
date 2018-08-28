import React from 'react';
import { Icon } from 'react-native-elements';

export default ({ navigation }) => (
  <Icon
    name="settings"
    onPress={() => navigation.navigate('Settings')}
    underlayColor="transparent"
  />
);
