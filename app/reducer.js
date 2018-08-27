export const SET_IS_PLAYING = 'SET_IS_PLAYING';
export const SET_EDIT_MODE = 'SET_EDIT_MODE';
export const SET_AVAILABLE_SOUNDS = 'SET_AVAILABLE_SOUNDS';

const initialState = {
  editMode: false,
  isPlaying: false,
  availableSounds: []
};

export default function reducer(state = initialState, action) {
  console.log('Triggered reducer action:', action);
  const { editMode, isPlaying, availableSounds } = action.payload;

  switch (action.type) {
    case SET_EDIT_MODE:
      return { ...state, editMode };
    case SET_IS_PLAYING:
      return { ...state, isPlaying };
    case SET_AVAILABLE_SOUNDS:
      return { ...state, availableSounds };
    default:
      return state;
  }
}
