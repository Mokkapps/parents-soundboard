import React from 'react';
import { Platform } from 'react-native';
import firebase from 'react-native-firebase';

import { ANDROID_ADMOB_ID, APPLE_ADMOB_ID, DEV_ADMOB_ID } from '../constants';

const getAdUnitId = () => {
  if (__DEV__) {
    return DEV_ADMOB_ID;
  }

  return Platform.OS === 'android' ? ANDROID_ADMOB_ID : APPLE_ADMOB_ID;
};

class AdBanner extends React.Component {
  render() {
    const Banner = firebase.admob.Banner;
    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();

    return (
      <Banner
        unitId={getAdUnitId()}
        size={'SMART_BANNER'}
        request={request.build()}
        onAdLoaded={() => {
          console.log('Advert loaded');
        }}
      />
    );
  }
}

export default AdBanner;
