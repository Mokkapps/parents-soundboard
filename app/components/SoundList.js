import React from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import Tts from 'react-native-tts';
import { connect } from 'react-redux';

import I18n from '../i18n/i18n';

const data = I18n.t('sounds');

// import { AdMobInterstitial } from "react-native-admob";
// import SoundListAd from "./ads/SoundListAd";
// var AdMobConfig = require("../config/ads.json");

function requestInterstitialAd() {
  //   if (AdMobConfig.isAdmobEnable) {
  //     AdMobInterstitial.setAdUnitID(AdMobConfig.InterstitialID);
  //     AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
  //   }
}

function longPressSong(item) {
  alert(item.sound);
}

class SoundList extends React.Component {
  constructor() {
    super();
    Tts.addEventListener('tts-start', event => console.log('TTS start', event));
    Tts.addEventListener('tts-finish', event => {
      console.log('TTS finish', event);
      this.props.setIsPlaying(false);
    });
    Tts.addEventListener('tts-cancel', event => {
      console.log('TTS cancel', event);
      this.props.setIsPlaying(false);
    });
  }

  playSound = soundObject => {
    Tts.speak(soundObject.title);
    this.props.setIsPlaying(true);
  };

  _onTextChange = (text, id) => console.log('Text changed', text, id);

  _renderItem = ({ item }) => {
    const { editMode } = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => this.playSound(item)}>
        <View style={styles.box}>
          {editMode ? (
            <TextInput onChangeText={text => this._onTextChange(text, item.id)}>
              {item.title}
            </TextInput>
          ) : (
            <Text>{item.title}</Text>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    const { editMode } = this.props;
    console.log('editMode render', editMode);
    return (
      <View style={styles.flatView}>
        <FlatList
          keyExtractor={(item, index) => item.id}
          data={data}
          extraData={this.props}
          renderItem={this._renderItem}
          contentContainerStyle={styles.flatContainer}
          horizontal={false}
          numColumns={3}
          removeClippedSubviews={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'grey',
    margin: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  flatContainer: {
    margin: 5
  },
  flatView: {
    flex: 1,
    marginBottom: 10
  }
});

const mapStateToProps = ({ editMode }) => ({
  editMode
});

const mapDispatchToProps = dispatch => {
  return {
    setIsPlaying: isPlaying =>
      dispatch({ type: 'SET_IS_PLAYING', payload: { isPlaying } })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SoundList);
