import { Image, Linking, Platform } from 'react-native';
import React from 'react';
import { Button, Text } from 'react-native-elements';
import email from 'react-native-email';
import styled from 'styled-components';

import {
  COLORS,
  MOKKAPPS_MAIL,
  APP_STORE_URL,
  GOOGLE_PLAY_URL
} from '../constants';
import I18n from '../i18n/i18n';
import { version } from '../../package.json';

const StyledContainer = styled.View`
  margin: 10px;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const ButtonWrapper = styled.View`
  margin-top: 20px;
  width: 200px;
`;

class About extends React.Component {
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
        <Image source="../images/welcome.png" />
        <Text h3 style={{ color: 'white' }}>
          {I18n.t('APP_TITLE')}
        </Text>
        <Text style={{ color: 'white' }}>{`${I18n.t(
          'VERSION'
        )} ${version}`}</Text>
        <ButtonWrapper>
          <Button
            large
            rounded
            raised
            backgroundColor={COLORS.LIGHT_GRAY}
            color="black"
            title={I18n.t('RATE_APP')}
            onPress={this.onPressRate}
          />
        </ButtonWrapper>
        <ButtonWrapper>
          <Button
            large
            rounded
            raised
            backgroundColor={COLORS.LIGHT_GRAY}
            color="black"
            title={I18n.t('CONTACT_US')}
            onPress={this.onPressContact}
          />
        </ButtonWrapper>
      </StyledContainer>
    );
  }
}

export default About;
