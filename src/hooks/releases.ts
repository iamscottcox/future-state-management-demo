import { useQuery } from 'react-query';
import { FetchReleasesParams, fetchReleases } from 'src/api/releases';

export const useReleases = (params: FetchReleasesParams) =>
  useQuery(['releases', params], () => fetchReleases(params));
