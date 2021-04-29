export const getPrimaryArtistImage = (state: API.ArtistImage[]) =>
  state.find((image) => image.type === 'primary');
