import {configureStore} from '@reduxjs/toolkit';
import googleReducer from './features/googleSlice';
import userReducer from './features/userSlice';

export default configureStore({
  reducer: {
    googleKey: googleReducer, // naziv reducera mora biti isti kao name:'' u slice.js
    user: userReducer,
  },
});