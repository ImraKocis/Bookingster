import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  form: null,
};

export const registrationFormSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormState: (state, action) => {
      console.log('Payload Form =>', action.payload);
      state.form = {...state.form, ...action.payload};
      console.log('Form state=>', state.form);
    },
  },
});

export const {updateFormState} = registrationFormSlice.actions;

// selectors
export const selectForm = state => state.form.form;

export default registrationFormSlice.reducer;
