import { AppState } from 'src/state';

export const getArtistsSearchValue = (state: AppState) =>
  state.filters.artists.search;
