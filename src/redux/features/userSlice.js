import { createSlice } from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';

const initialState = {
  user: null,
  signUpData: null,
  user_firebase: null,
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signUp: (state, action) => {
      state.signUpData = { ...state.signUpData, ...action.payload };
    },
    login: (state, action) => {
      console.log('ACTION', action.payload);
      state.user = { ...state.user, ...action.payload };
      console.log('USER STATE', state.user);
    },
    logout: (state) => {
      state.user = null;
    },
    updateUserInfo: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { login, logout, updateUserInfo, signUp } = userSlice.actions;

// selectors
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;

export function fetchUserJwt() {
  return async (dispatch) => {
    try {
      const USER_JWT = await auth().currentUser.getIdToken(true);
      // console.log(USER_JWT);
      dispatch(updateUserInfo({ jwt: USER_JWT }));
    } catch (error) {
      console.log('USER_JWT_RESPONSE_ERROR =>', error);
    }
  };
}
