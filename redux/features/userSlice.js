import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: state => {
      state.user = null;
    },
    updateUserInfo: (state, action) => {
      state.user = {...state.user, ...action.payload};
    },
  },
});

export const {login, logout, updateUserInfo} = userSlice.actions;

// selectors
export const selectUser = state => state.user.user;

export default userSlice.reducer;
