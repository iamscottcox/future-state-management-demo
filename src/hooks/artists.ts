import { FetchArtistsQueryKey, FetchArtistsOptions, fetchArtists, FetchArtistByIdOptions, FetchArtistByIdQueryKey, fetchArtistById } from 'src/api/artists';
import { useQuery } from "react-query"

export const useArtists = (options: FetchArtistsOptions) => {
    return useQuery<API.Response<API.ArtistPreview[]>, Error, API.Response<API.ArtistPreview[]>, FetchArtistsQueryKey>(['artists', options], fetchArtists);
}

export const useArtistById = (options: FetchArtistByIdOptions) => {
    return useQuery<API.Artist, Error, API.Artist, FetchArtistByIdQueryKey>(['artists', options], fetchArtistById);
}