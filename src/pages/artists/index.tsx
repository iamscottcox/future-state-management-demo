import { useRouter } from 'next/dist/client/router';
import { FC, useContext } from 'react';

import { Artists } from 'src/components/Artists';
import Search from 'src/components/Filters/Search';
import { Pagination } from 'src/components/Pagination';
import { useArtists } from 'src/hooks/artists';
import { parseSearchQuery } from 'src/libs/paths';
import { ArtistSearchContext } from 'src/state/contexts/artistSearch';

export const ArticlesPage: FC = () => {
  const { artistSearch, setArtistSearch } = useContext(ArtistSearchContext);

  const router = useRouter();
  const page = parseInt(parseSearchQuery(router.query.page));

  const { isLoading, data, error } = useArtists({
    search: artistSearch,
    pageNumber: page,
  });

  const handleSearchSubmit = (value: string) => {
    setArtistSearch(value);
    router.replace('/artists', undefined, { scroll: false });
  };

  return (
    <div>
      <Search initialValue={artistSearch} onSubmit={handleSearchSubmit} />
      <Pagination page={page} pages={data?.pagination?.pages} />
      <Artists artists={data?.results} isLoading={isLoading} error={error} />
    </div>
  );
};

export default ArticlesPage;
