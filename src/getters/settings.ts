import { AppState } from 'src/state';

export const getDefaultCurrency = (state: AppState) =>
  state.settings.defaultCurrency;
