import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Tts from 'react-native-tts';

import I18n from '../../i18n/i18n';
import PlaylistItem from '../PlaylistItem';
import HeaderButton from '../HeaderButton';

const StyledView = styled.View`
  margin: 5px;
`;

const StyledText = styled.Text`
  color: white;
  font-size: 20;
  font-weight: bold;
  margin: auto;
`;

class PlaylistScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const isPlaying = navigation.getParam('isPlaying', false);
    const setPlaylist = navigation.getParam('setPlaylist', undefined);
    return {
      title: I18n.t('PLAYLIST_SCREEN_TITLE'),
      headerRight: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            testID="PlaylistScreen_MuteButton"
            title="Mute"
            show={!isPlaying}
            iconName="stop"
            onPress={() => {
              Tts.stop();
              setPlaylist([]);
            }}
          />
        </HeaderButtons>
      )
    };
  };

  componentDidMount() {
    const { isPlaying, setPlaylist } = this.props;
    this.props.navigation.setParams({
      isPlaying
    });
    this.props.navigation.setParams({
      setPlaylist
    });
  }

  shouldComponentUpdate(nextProps) {
    const {
      isPlaying
    } = nextProps;
    if (nextProps.navigation.getParam('isPlaying', false) !== isPlaying) {
      this.props.navigation.setParams({ isPlaying });
    }
    return true;
  }

  render() {
    const { playlist } = this.props;
    return (
      <StyledView>
        <FlatList
          testID="PlaylistScreen_Playlist"
          ListEmptyComponent={
            <StyledText>{I18n.t('PLAYLIST_SCREEN_EMPTY')}</StyledText>
          }
          keyExtractor={item => item.id}
          data={playlist}
          renderItem={({ item, index }) => (
            <PlaylistItem
              testID={`PlaylistScreen_LanguageItem_${index}`}
              text={`${item.count}x: ${item.text}`}
            />
          )}
        />
      </StyledView>
    );
  }
}

const mapStateToProps = ({ playlist, isPlaying }) => ({
  playlist,
  isPlaying
});

const mapDispatchToProps = dispatch => {
  return {
    setPlaylist: playlist =>
      dispatch({ type: 'SET_PLAYLIST', payload: { playlist } })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistScreen);
