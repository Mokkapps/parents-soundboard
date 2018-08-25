export const SET_IS_PLAYING = 'SET_IS_PLAYING';
export const SET_PLAYLIST = 'SET_PLAYLIST';
export const SET_CURRENT_PLAYING_SOUND = 'SET_CURRENT_PLAYING_SOUND';
export const SET_EDIT_MODE = 'SET_EDIT_MODE';

const initialState = {
  editMode: false,
  isPlaying: false,
  currentPlaylist: [],
  currentPlayingSound: null
};

export default function reducer(state = initialState, action) {
  console.log('triggered action', action);
  switch (action.type) {
    case SET_EDIT_MODE:
      const { editMode } = action.payload;
      return { ...state, editMode };
    case SET_IS_PLAYING:
      const { isPlaying } = action.payload;
      return { ...state, isPlaying };
    case SET_PLAYLIST:
      const { currentPlaylist } = action.payload;
      return { ...state, currentPlaylist };
    case SET_CURRENT_PLAYING_SOUND:
      const { currentPlayingSound } = action.payload;
      return { ...state, SET_CURRENT_PLAYING_SOUND };
    default:
      return state;
  }
}
