import { Form, Pagination, PaginationProps, Select } from 'semantic-ui-react';
import { useRouter } from 'next/dist/client/router';
import { FC, MouseEvent as ReactMouseEvent, useContext, useMemo } from 'react';

import { Artists } from 'src/components/Artists';
import Search from 'src/components/Filters/Search';
import { useArtists } from 'src/hooks/artists';
import { parseSearchQuery, replacePath } from 'src/libs/paths';
import { ArtistSearchContext } from 'src/state/contexts/artistSearch';
import styled from 'styled-components';
import Title from 'antd/lib/typography/Title';

const StyledArtistsPage = styled.div`
  h1 {
    margin-bottom: 1rem;
  }

  .filters {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 1rem;

    .spacer {
      flex: 1 1 auto;
    }

    .per-page {
      display: flex;
      flex-direction: column;
      width: 100px;
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

  const handlePaginationChange = (
    e: ReactMouseEvent<HTMLAnchorElement, MouseEvent>,
    { activePage }: PaginationProps
  ) => {
    handleReplacePath({ key: 'page', value: activePage });
  };

  return (
    <StyledArtistsPage>
      <Title level={1}>Artists</Title>
      <div className="filters">
        <Search
          loading={isLoading}
          initialValue={artistSearch}
          onSubmit={handleSearchSubmit}
        />
        <div className="spacer" />
        <div className="per-page">
          <label>Per Page</label>
          <Select
            fluid
            value={perPage}
            options={[
              { key: '100', value: '100', text: '100' },
              { key: '50', value: '50', text: '50' },
              { key: '25', value: '25', text: '25' },
              { key: '10', value: '10', text: '10' },
            ]}
          />
        </div>
        <Pagination
          activePage={page}
          onPageChange={handlePaginationChange}
          totalPages={pages}
        />
      </div>
      <Artists artists={data?.results} isLoading={isLoading} error={error} />
    </StyledArtistsPage>
  );
};

export default ArtistsPage;
