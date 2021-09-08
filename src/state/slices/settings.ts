import { createSlice } from '@reduxjs/toolkit';

import { CURRENCIES } from 'src/constants/currencies';
import { REGIONS } from 'src/constants/regions';
import { SORT_DIRECTIONS, SORT_TYPES } from 'src/constants/releases';

const initialState = {
  defaultCurrency: CURRENCIES[0],
  defaultRegion: REGIONS[0],
  showCurrencySymbol: true,
  releases: {
    sort: SORT_TYPES[0][1],
    sortOrder: SORT_DIRECTIONS[0][1],
  },
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setDefaultCurrency(state, { payload }) {
      state.defaultCurrency = payload;
    },
    setDefaultRegion(state, { payload }) {
      state.defaultRegion = payload;
    },
    setShowCurrencySymbol(state, { payload }) {
      state.showCurrencySymbol = payload;
    },
  },
});

export const {
  setDefaultCurrency,
  setDefaultRegion,
  setShowCurrencySymbol,
} = settingsSlice.actions;

export default settingsSlice.reducer;
