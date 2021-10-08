import {
  fetchArtists,
  fetchArtistById,
  FetchArtistsParams,
  FetchArtistByIdParams,
} from 'src/api/artists';
import { useQuery } from 'react-query';

export const useArtists = (params: FetchArtistsParams) =>
  useQuery(['artists', params], () => fetchArtists(params));

export const useArtistById = (params: FetchArtistByIdParams) =>
  useQuery(['artists', params], () => fetchArtistById(params));
