import {createSlice} from '@reduxjs/toolkit';
import instance from '../../axios/adminInstance';

export const googleSlice = createSlice({
  name: 'googleKey',
  initialState: {
    key: 'x',
  },
  reducers: {
    setGoogleKey: (state, action) => {
      state.key = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setGoogleKey} = googleSlice.actions;

// selectors
export const selectorGoogle = state => state.googleKey.key;

export default googleSlice.reducer;

export function fetchGoogleKey() {
  return async dispatch => {
    var result = await instance.get('configuration');
    dispatch(setGoogleKey(result.data));
  };
}
