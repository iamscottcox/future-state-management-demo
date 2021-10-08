import axios from 'axios';

export const Api = axios.create({
  baseURL: 'https://api.discogs.com',
  timeout: 1000,
  headers: {
    Authorization: `Discogs token=jFjPgGkhDPUtSJbONaeKkMsPsmdbcbfEORRVAVlj`,
  },
});

export default Api;
