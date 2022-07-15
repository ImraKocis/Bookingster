import { createSlice } from '@reduxjs/toolkit';
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
export const { setGoogleKey } = googleSlice.actions;

// selectors
export const selectorGoogle = (state) => state.googleKey.key;

export default googleSlice.reducer;

export function fetchGoogleKey() {
  return async (dispatch) => {
    try {
      const response = await instance.get('configuration');
      // console.log(response);
      dispatch(setGoogleKey(response.data.googleClientId));
    } catch (error) {
      console.error(error.response.data.errorMessage);
    }
  };
}
