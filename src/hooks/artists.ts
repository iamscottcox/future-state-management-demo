import { FetchArtistsQueryKey, FetchArtistsOptions, fetchArtists } from 'src/api/artists';
import { useQuery } from "react-query"

export const useArtists = (options: FetchArtistsOptions) => {
    return useQuery<API.Response<API.Artist[]>, Error, API.Response<API.Artist[]>, FetchArtistsQueryKey>(['artists', options], fetchArtists);
}