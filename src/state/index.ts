import { configureStore } from '@reduxjs/toolkit';

import { loadState, saveState } from 'src/state/localStorage';
import drafts from 'src/state/slices/drafts';
import filters from 'src/state/slices/filters';
import settings from 'src/state/slices/settings';

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    drafts,
    filters,
    settings,
  },
  preloadedState,
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
