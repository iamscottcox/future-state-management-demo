import { createSlice } from '@reduxjs/toolkit';

import { CURRENCIES } from 'src/constants/currencies';
import { REGIONS } from 'src/constants/regions';

const initialState = {
  defaultCurrency: CURRENCIES[0],
  defaultRegion: REGIONS[0],
  showCurrencySymbol: true,
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
    setDefaultRegion(state, { payload }) {
      return {
        ...state,
        defaultRegion: payload,
      };
    },
    setShowCurrencySymbol(state, { payload }) {
      return {
        ...state,
        showCurrencySymbol: payload,
      };
    },
  },
});

export const {
  setDefaultCurrency,
  setDefaultRegion,
  setShowCurrencySymbol,
} = settingsSlice.actions;

export default settingsSlice.reducer;
