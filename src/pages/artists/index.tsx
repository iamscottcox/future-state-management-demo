import Form from 'react-bootstrap/Form';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { useRouter } from 'next/dist/client/router';
import { FC, useContext, useMemo } from 'react';

import { Artists } from 'src/components/Artists';
import Search from 'src/components/Filters/Search';
import { useArtists } from 'src/hooks/artists';
import { parseSearchQuery, replacePath } from 'src/libs/paths';
import { ArtistSearchContext } from 'src/state/contexts/artistSearch';
import styled from 'styled-components';
import Pagination from 'src/components/Pagination';
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

    .pagination {
      align-items: flex-end;
    }

    > * {
      margin-right: 1rem;

      &::last-of-type {
        margin-right: none;
      }
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

  console.log('pages', pages);

  const handleSearchSubmit = (value: string) => {
    setArtistSearch(value);
    handleReplacePath({ key: 'page', value: 1 });
  };

  return (
    <StyledArtistsPage>
      <Jumbotron>
        <Title level={1}>Artists</Title>
      </Jumbotron>
      <div className="filters">
        <Search initialValue={artistSearch} onSubmit={handleSearchSubmit} />
        <Form>
          <Form.Group>
            <Form.Label htmlFor="rows-per-page-select">
              Rows per page
            </Form.Label>
            <Form.Control
              id="rows-per-page-select"
              as="select"
              onChange={(e) => {
                setPerPage(e.target.value);
              }}
            >
              <option value="100">100</option>
              <option value="50">50</option>
              <option value="25">25</option>
              <option value="10">10</option>
            </Form.Control>
          </Form.Group>
        </Form>
        <div className="spacer" />
        <Pagination page={page} pages={pages} />
      </div>
      <Artists artists={data?.results} isLoading={isLoading} error={error} />
    </StyledArtistsPage>
  );
};

export default ArtistsPage;
