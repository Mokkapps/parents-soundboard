import reducer from './reducer';

const initialState = {
  editMode: false,
  isPlaying: false,
  availableSounds: []
};

it('correctly handles SET_EDIT_MODE action', () => {
  const newState = reducer(initialState, {
    type: 'SET_EDIT_MODE',
    payload: { editMode: true }
  });
  expect(newState).toEqual({
    editMode: true,
    isPlaying: false,
    availableSounds: []
  });
});

it('correctly handles SET_IS_PLAYING action', () => {
  const newState = reducer(initialState, {
    type: 'SET_IS_PLAYING',
    payload: { isPlaying: true }
  });
  expect(newState).toEqual({
    editMode: false,
    isPlaying: true,
    availableSounds: []
  });
});

it('correctly handles SET_AVAILABLE_SOUNDS action', () => {
  const newState = reducer(initialState, {
    type: 'SET_AVAILABLE_SOUNDS',
    payload: { availableSounds: [1, 2, 3] }
  });
  expect(newState).toEqual({
    editMode: false,
    isPlaying: false,
    availableSounds: [1, 2, 3]
  });
});
