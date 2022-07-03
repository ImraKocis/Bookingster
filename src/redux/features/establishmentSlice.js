import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  establishment: null,
  reservations: null,
};

// eslint-disable-next-line import/prefer-default-export
export const establishmentSlice = createSlice({
  name: 'establishment',
  initialState,
  reducers: {
    updateEstablishmentState: (state, action) => {
      // console.log('PAYLOAD==>', action.payload);
      state.establishment = [...action.payload];
      // console.log('STATE==>', state.establishment);
    },

    updateEstablishmentReservationState: (state, action) => {
      state.reservations = [...action.payload];
    },
  },
});

export const { updateEstablishmentState, updateEstablishmentReservationState } =
  establishmentSlice.actions;

export const selectEstablishment = (state) => state.establishment.establishment;

export const selectEstablishmentReservations = (state) => state.establishment.reservations;

export default establishmentSlice.reducer;
