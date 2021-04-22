import { AppState } from 'src/state';

export const getSearchValue = (state: AppState) => state.filters.search;
export const getSelectedTag = (state: AppState) => state.filters.tag;