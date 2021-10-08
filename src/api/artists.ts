import Api from '.';

export interface FetchArtistsParams {
  pageNumber?: number;
  perPage: string;
  search: string;
}

export const fetchArtists = ({
  search,
  pageNumber = 1,
  perPage,
}: FetchArtistsParams): Promise<API.Response<API.Artist[]>> =>
  Api.get(
    `database/search?q=${search}&type=artist&per_page=${perPage}&page=${pageNumber}`
  ).then((response) => response.data);

export interface FetchArtistByIdParams {
  id?: number | string;
}

export const fetchArtistById = ({ id }: FetchArtistByIdParams) =>
  Api.get(`artists/${id}`).then((response) => response.data);
