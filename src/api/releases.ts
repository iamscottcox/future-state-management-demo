export interface FetchReleasesOptions { id: string, sort?: string, sortOrder?: string, pageNumber?: string }

export type FetchReleasesQueryKey = [string, FetchReleasesOptions];

export interface FetchReleasesParams {
  queryKey: FetchReleasesQueryKey;
}

export const fetchReleases = async ({ queryKey }: FetchReleasesParams): Promise<API.Response<API.Release[]>> => { 
    const [, { id, sort = "year", sortOrder = "desc", pageNumber = '1' }] = queryKey;

    try {
        const response = await fetch(
          `https://api.discogs.com/artists/${id}/releases?sort=${sort}&sort_order=${sortOrder}&per_page=100&page=${pageNumber}`,
          {
            headers: {
              Authorization: `Discogs token=jFjPgGkhDPUtSJbONaeKkMsPsmdbcbfEORRVAVlj`,
            },
          }
        );

        const results = response.json()
  
        return results;
      } catch (error) {
        console.error(error);
        return error;
      }
}