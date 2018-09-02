export const SET_EDIT_MODE = 'SET_EDIT_MODE';
export const SET_AVAILABLE_SOUNDS = 'SET_AVAILABLE_SOUNDS';
export const SET_PLAYLIST = 'SET_PLAYLIST';

const initialState = {
  editMode: false,
  isPlaying: false,
  availableSounds: [],
  playlist: []
};

export default function reducer(state = initialState, action) {
  console.log('Triggered reducer action:', action);

  switch (action.type) {
    case SET_EDIT_MODE:
      const { editMode } = action.payload;
      return { ...state, editMode };
    case SET_AVAILABLE_SOUNDS:
      const { availableSounds } = action.payload;
      return { ...state, availableSounds };
    case SET_PLAYLIST:
      const { playlist } = action.payload;
      const isPlaying = playlist.length > 0;
      return { ...state, playlist, isPlaying };
    default:
      return state;
  }
}
