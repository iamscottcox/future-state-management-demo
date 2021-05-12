import Title from 'antd/lib/typography/Title';
import { HTMLSelect } from '@blueprintjs/core';
import { useRouter } from 'next/dist/client/router';
import { FC, useContext, useMemo } from 'react';
import styled from 'styled-components';

// components
import { Artists } from 'src/components/Artists';
import Search from 'src/components/Filters/Search';
import Pagination from 'src/components/Pagination';
// hooks
import { useArtists } from 'src/hooks/artists';
// libs
import { parseSearchQuery, replacePath } from 'src/libs/paths';
// state
import { ArtistSearchContext } from 'src/state/contexts/artistSearch';

const StyledArtistsPage = styled.div`
  h1 {
    margin-bottom: 1rem;
  }

  .filters {
    display: flex;
    margin-bottom: 2rem;
    align-items: flex-end;

    .spacer {
      flex: 1 1 auto;
    }

    .per-page-select-wrapper {
      margin-right: 1rem;
    }
  }
`;

export const ArtistsPage: FC = () => {
  const { artistSearch, setArtistSearch, perPage, setPerPage } = useContext(
    ArtistSearchContext
  );

  const router = useRouter();
  const page = parseInt(parseSearchQuery(router.query.page) || '1');
  const handleReplacePath = useMemo(() => replacePath(router), [router]);

  const { isLoading, data, error } = useArtists({
    search: artistSearch,
    pageNumber: page,
    perPage,
  });

  const pages = data?.pagination?.pages || 0;

  const handleSearchSubmit = (value: string) => {
    setArtistSearch(value);
    handleReplacePath({ key: 'page', value: 1 });
  };

  return (
    <StyledArtistsPage>
      <Title level={1}>Artists</Title>
      <div className="filters">
        <Search initialValue={artistSearch} onSubmit={handleSearchSubmit} />
        <div className="spacer" />
        <div className="per-page-select-wrapper">
          <p>
            <label>Per Page</label>
          </p>
          <HTMLSelect
            value={perPage}
            onChange={(e) => setPerPage(e.target.value)}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </HTMLSelect>
        </div>
        <Pagination pages={pages} page={page} />
      </div>
      <Artists artists={data?.results} isLoading={isLoading} error={error} />
    </StyledArtistsPage>
  );
};

export default ArtistsPage;
