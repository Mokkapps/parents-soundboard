import reducer from './reducer';

const initialState = {
  editMode: false,
  isPlaying: false,
  availableSounds: [],
  playlist: []
};

it('correctly handles SET_EDIT_MODE action', () => {
  const newState = reducer(initialState, {
    type: 'SET_EDIT_MODE',
    payload: { editMode: true }
  });
  expect(newState).toEqual({
    editMode: true,
    isPlaying: false,
    availableSounds: [],
    playlist: []
  });
});

it('correctly handles SET_PLAYLIST action', () => {
  const newState = reducer(initialState, {
    type: 'SET_PLAYLIST',
    payload: { playlist: [{ text: 'Hallo', id: 123 }] }
  });
  expect(newState).toEqual({
    editMode: false,
    isPlaying: true,
    availableSounds: [],
    playlist: [{ text: 'Hallo', id: 123 }]
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
    availableSounds: [1, 2, 3],
    playlist: []
  });
});
