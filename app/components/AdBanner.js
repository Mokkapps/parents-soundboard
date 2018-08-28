import React from 'react';
import { Platform } from 'react-native';
import { AdMobBanner } from 'react-native-admob';
import styled from 'styled-components';

import { ANDROID_ADMOB_ID, APPLE_ADMOB_ID, DEV_ADMOB_ID } from '../constants';
import isTablet from '../deviceDetector';

const AdContainer = styled.View`
  margin: auto;
`;

const getAdUnitId = () => {
  if (__DEV__) {
    return DEV_ADMOB_ID;
  }

  return Platform.OS === 'android' ? ANDROID_ADMOB_ID : APPLE_ADMOB_ID;
};

export default () => (
  <AdContainer>
    <AdMobBanner
      adSize={isTablet() ? 'fullBanner' : 'banner'}
      adUnitID={getAdUnitId()}
      testDevices={[AdMobBanner.simulatorId]}
      onAdFailedToLoad={error => console.error(error)}
    />
  </AdContainer>
);
