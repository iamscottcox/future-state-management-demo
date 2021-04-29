import { useRouter } from 'next/dist/client/router';
import { ChangeEvent, FC, useContext } from 'react';

import { Artists } from 'src/components/Artists';
import Search from 'src/components/Filters/Search';
import { Pagination } from 'src/components/Pagination';
import { useArtists } from 'src/hooks/artists';
import { parseSearchQuery } from 'src/libs/paths';
import { ArtistSearchContext } from 'src/state/contexts/artistSearch';

export const ArticlesPage: FC = () => {
  const { artistSearch, setArtistSearch, perPage, setPerPage } = useContext(
    ArtistSearchContext
  );

  const router = useRouter();

  const page = parseInt(parseSearchQuery(router.query.page) || '1');

  const { isLoading, data, error } = useArtists({
    search: artistSearch,
    pageNumber: page,
    perPage,
  });

  const handlePerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPerPage(e.target.value);
    router.replace('/artists', undefined, { scroll: false });
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setArtistSearch(e.target.value);
  };

  return (
    <div>
      <Search onChange={handleSearchChange} value={artistSearch} />
      <label htmlFor="per-page-select">Results Per Page:</label>
      <select
        id="per-page-select"
        value={perPage}
        onChange={handlePerPageChange}
      >
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <Pagination page={page} pages={data?.pagination?.pages} />
      <Artists artists={data?.results} isLoading={isLoading} error={error} />
    </div>
  );
};

export default ArticlesPage;
