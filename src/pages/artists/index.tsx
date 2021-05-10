import { Pagination } from 'antd';
import { useRouter } from 'next/dist/client/router';
import { FC, useContext, useMemo } from 'react';

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
    margin-bottom: 2rem;

    .spacer {
      flex: 1 1 auto;
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

  const items = data?.pagination?.items || 0;

  const handleSearchSubmit = (value: string) => {
    setArtistSearch(value);
    handleReplacePath({ key: 'page', value: 1 });
  };

  return (
    <StyledArtistsPage>
      <Title level={1}>Artists</Title>
      <div className="filters">
        <div>
          <Search initialValue={artistSearch} onSubmit={handleSearchSubmit} />
        </div>
        <div className="spacer" />
        <Pagination
          showSizeChanger
          onChange={(page) => {
            if (page > 0) {
              handleReplacePath({ key: 'page', value: page });
            }
          }}
          onShowSizeChange={(current, pageSize) => {
            setPerPage(pageSize);
            handleReplacePath({ key: 'page', value: 1 });
          }}
          defaultCurrent={page}
          total={items}
          pageSizeOptions={['10', '25', '50', '100']}
        />
      </div>
      <Artists artists={data?.results} isLoading={isLoading} error={error} />
    </StyledArtistsPage>
  );
};

export default ArtistsPage;
