import { createSlice } from '@reduxjs/toolkit';

import { currencies } from 'src/constants/currencies';

const initialState = {
  defaultCurrency: currencies[0],
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setDefaultCurrency(state, { payload }) {
      return {
        ...state,
        defaultCurrency: payload,
      };
    },
  },
});

export const { setDefaultCurrency } = settingsSlice.actions;
export default settingsSlice.reducer;
