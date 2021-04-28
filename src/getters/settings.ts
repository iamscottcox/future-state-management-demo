import { AppState } from 'src/state';

export const getDefaultCurrency = (state: AppState) =>
  state.settings.defaultCurrency;

export const getDefaultRegion = (state: AppState) =>
  state.settings.defaultRegion;

export const getShowCurrencySymbol = (state: AppState) =>
  state.settings.showCurrencySymbol;
