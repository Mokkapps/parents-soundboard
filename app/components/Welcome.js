import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Tts from 'react-native-tts';

// import WelcomeAd from "./ads/WelcomeAd";

class Welcome extends React.Component {
  static navigationOptions = {
    title: 'Welcome'
  };

  constructor() {
    super();

    Tts.getInitStatus().then(
      () => {
        console.log('TTS initialized');
      },
      err => {
        if (err.code === 'no_engine') {
          console.log(
            'TTS engine is not (yet) installed on the phone, request installing engine'
          );
          Tts.requestInstallEngine();
        }
      }
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.imageContainer}>
        <Image
          style={{ width: 300, height: 300 }}
          resizeMode="contain"
          source={require('./../images/welcome.png')}
        />

        <Button
          title="START"
          borderRadius={5}
          containerViewStyle={styles.startButtonContainer}
          color="white"
          backgroundColor="rgb(74,144,226)"
          onPress={() => navigate('Home')}
        />

        {/* <WelcomeAd /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 25,
    marginTop: 15
  },
  startButtonContainer: {
    backgroundColor: 'blue',
    margin: 15,
    width: 150
  }
});

export default Welcome;
