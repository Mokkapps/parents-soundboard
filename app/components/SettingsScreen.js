import { Linking, Platform } from 'react-native';
import React from 'react';
import { Text } from 'react-native-elements';
import email from 'react-native-email';
import styled from 'styled-components';

import {
  COLORS,
  MOKKAPPS_MAIL,
  APP_STORE_URL,
  GOOGLE_PLAY_URL
} from '../../constants';
import I18n from '../../i18n/i18n';
import { version } from '../../package.json';
import SettingsButton from '../SettingsButton';
import SettingsDivider from '../SettingsDivider';

const StyledContainer = styled.View`
  margin: 5px;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const ButtonGroup = styled.View`
  width: 100%;
  display: flex;
`;

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'About',
    headerStyle: {
      backgroundColor: COLORS.MOKKAPPS_RED
    }
  };

  onPressContact = () => {
    const os = Platform.OS === 'ios' ? 'iOS' : 'Android';
    const to = [MOKKAPPS_MAIL];
    email(to, {
      subject: `${I18n.t('MAIL_SUBJECT')} (Version: ${version}, OS: ${os})`
    }).catch(console.error);
  };

  onPressRate = async () => {
    if (Platform.OS === 'ios') {
      await Linking.openURL(APP_STORE_URL);
    } else {
      await Linking.openURL(GOOGLE_PLAY_URL);
    }
  };

  render() {
    return (
      <StyledContainer>
        <Text h4 style={{ color: 'white' }}>
          TTS
        </Text>
        <ButtonGroup>
          <SettingsButton
            title={I18n.t('CHECK_TTS')}
            onPress={this.onPressRate}
          />
          <SettingsButton
            title={I18n.t('INSTALL_TTS_LANGUAGES')}
            onPress={this.props.navigation.navigate('TtsLanguages')}
          />
        </ButtonGroup>
        <SettingsDivider />
        <Text h4 style={{ color: 'white' }}>
          About
        </Text>
        <ButtonGroup>
          <SettingsButton
            title={I18n.t('RATE_APP')}
            onPress={this.onPressRate}
          />
          <SettingsButton
            title={I18n.t('CONTACT_US')}
            onPress={this.onPressContact}
          />
        </ButtonGroup>
        <SettingsDivider />
        <Text style={{ color: 'white' }}>{`${I18n.t(
          'VERSION'
        )} ${version}`}</Text>
      </StyledContainer>
    );
  }
}

export default SettingsScreen;
