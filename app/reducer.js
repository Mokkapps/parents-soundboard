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

  switch (action.type) {
    case SET_EDIT_MODE:
      const { editMode } = action.payload;
      return { ...state, editMode };
    case SET_IS_PLAYING:
      const { isPlaying } = action.payload;
      return { ...state, isPlaying };
    case SET_AVAILABLE_SOUNDS:
      const { availableSounds } = action.payload;
      return { ...state, availableSounds };
    default:
      return state;
  }
}
