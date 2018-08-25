import React from 'react';
import { Button } from 'react-native-elements';
import { View, Text, StatusBar, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import SoundList from './SoundList';
import StopButton from './StopButton';
import EditModeButton from './EditModeButton';

// import { AdMobInterstitial } from "react-native-admob";
// import SoundListAd from "./ads/SoundListAd";

// var AdMobConfig = require("../config/ads.json");

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerRight: (
      <View>
        <StopButton />
        <EditModeButton />
      </View>
    )
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="green" barStyle="light-content" />
        <SoundList />
        {/* <SoundListAd /> */}
      </View>
    );
  }
}

const mapStateToProps = ({ isPlaying }) => ({
  isPlaying
});

export default connect(
  mapStateToProps,
  null
)(Home);
