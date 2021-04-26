import { useQuery } from "react-query";
import { FetchReleasesOptions, FetchReleasesQueryKey, fetchReleases } from "src/api/releases";

export const useReleases = (options: FetchReleasesOptions) => {
    return useQuery<API.Response<API.Release[]>, Error, API.Response<API.Release[]>, FetchReleasesQueryKey>(['releases', options], fetchReleases);
}