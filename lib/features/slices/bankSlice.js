import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  banks: undefined
};

const slice = createSlice({
  name: 'bank',
  initialState,
  reducers: {
    setBanks(state, action) {
      state.banks = action.payload;
    },
  },
});

export const bankReducer = slice.reducer;
export const { setBanks } = slice.actions;