import React from 'react';
import { FlatList, Text } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';

import I18n from '../../i18n/i18n';
import PlaylistItem from '../PlaylistItem';

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
  static navigationOptions = {
    title: I18n.t('PLAYLIST_SCREEN_TITLE')
  };

  render() {
    const { playlist } = this.props;
    return (
      <StyledView>
        <FlatList
          testID="PlaylistScreen_Playlist"
          ListEmptyComponent={<StyledText>{I18n.t('PLAYLIST_SCREEN_EMPTY')}</StyledText>}
          keyExtractor={item => item.id}
          data={playlist}
          renderItem={({ item, index }) => (
            <PlaylistItem
              testID={`PlaylistScreen_LanguageItem_${index}`}
              text={item.text}
            />
          )}
        />
      </StyledView>
    );
  }
}

const mapStateToProps = ({ playlist }) => ({
  playlist
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
