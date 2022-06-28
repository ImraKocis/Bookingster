import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  form: [],
  // osnovniPodaci: {},
  // radnoVrijeme: [],
  // slika: {},
  // stolovi: [],
};

export const registrationFormSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormState: (state, action) => {
      // console.log('Payload Form =>', action.payload);
      state.form = [...state.form, ...action.payload];
      // console.log('Form state=>', state.form);
    },

    setOsnovniPodaci: (state, action) => {
      // state.osnovniPodaci = { ...state.osnovniPodaci, ...action.payload };
      const osnovniPodaci = { location: {} };
      if (
        Object.keys(action.payload).length === 4 &&
        Object.keys(action.payload.location).length === 3
      ) {
        osnovniPodaci.location = action.payload.location;
        osnovniPodaci.name = action.payload.name;
        osnovniPodaci.oib = action.payload.oib;
        osnovniPodaci.phoneNumber = action.payload.phoneNumber;
        if (!Object.keys(state.form).contains('oib')) {
          state.form = { ...state.form, ...osnovniPodaci };
        }
        console.log('FORM STATE ==>', state.form);
      }
    },
    setRadnoVrijeme: (state, action) => {
      if (action.payload.length > 0) {
        // state.radnoVrijeme = action.payload;
        state.form.workingHours = action.payload;
        console.log('FORM STATE ==>', state.form);
      }
    },
    setSlika: (state, action) => {
      if (Object.keys(action.payload).length === 4) {
        // state.slika = action.payload;
        state.form.images = [action.payload];
        console.log('FORM STATE ==>', state.form);
      }
    },
    setStolovi: (state, action) => {
      if (action.payload.length > 0) {
        // state.stolovi = action.payload;

        state.form.tables = action.payload;
      }

      console.log('FORM STATE ==>', state.form);
    },
  },
});

export const { updateFormState, setOsnovniPodaci, setRadnoVrijeme, setSlika, setStolovi } =
  registrationFormSlice.actions;

// selectors
export const selectForm = (state) => state.form.form;

export default registrationFormSlice.reducer;
