import Api from '.';

export interface FetchReleasesParams {
  id?: string | number;
  sort?: string;
  sortOrder?: string;
  pageNumber?: string | number;
  perPage?: string | number;
}

export const fetchReleases = ({
  id,
  sort = 'year',
  sortOrder = 'desc',
  pageNumber = '1',
  perPage = '100',
}: FetchReleasesParams): Promise<API.Response<API.Artist[]>> =>
  Api.get(
    `artists/${id}/releases?sort=${sort}&sort_order=${sortOrder}&per_page=${perPage}&page=${pageNumber}`
  ).then((response) => response.data);
