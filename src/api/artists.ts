export interface FetchArtistsOptions {
  search: string;
  pageNumber?: number;
  perPage?: string;
}

export type FetchArtistsQueryKey = [string, FetchArtistsOptions];

export interface FetchArtistsParams {
  queryKey: FetchArtistsQueryKey;
}

export const fetchArtists = async ({
  queryKey,
}: FetchArtistsParams): Promise<API.Response<API.ArtistPreview[]>> => {
  const [, { search = '', pageNumber = 1, perPage = '100' }] = queryKey;

  try {
    const response = await fetch(
      `https://api.discogs.com/database/search?q=${search}&type=artist&per_page=${perPage}&page=${pageNumber}`,
      {
        headers: {
          Authorization: `Discogs token=jFjPgGkhDPUtSJbONaeKkMsPsmdbcbfEORRVAVlj`,
        },
      }
    );

    const artists = await response.json();

    return artists;
  } catch (error) {
    return error;
  }
};

export interface FetchArtistByIdOptions {
  id?: string;
}
export type FetchArtistByIdQueryKey = [string, FetchArtistByIdOptions];
export interface FetchArtistByIdParams {
  queryKey: FetchArtistByIdQueryKey;
}

export const fetchArtistById = async ({
  queryKey,
}: FetchArtistByIdParams): Promise<API.Artist> => {
  const [, { id }] = queryKey;

  if (id === undefined) {
    return Promise.reject('No ID specified');
  }

  try {
    const response = await fetch(`https://api.discogs.com/artists/${id}`, {
      headers: {
        Authorization: `Discogs token=jFjPgGkhDPUtSJbONaeKkMsPsmdbcbfEORRVAVlj`,
      },
    });

    const artist = await response.json();

    return artist;
  } catch (error) {
    return error;
  }
};

export default fetchArtists;
