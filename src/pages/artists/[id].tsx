import { useRouter } from 'next/dist/client/router';
import { FC, useMemo } from 'react';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';

import { Loading } from 'src/components/Loading';
import Releases from 'src/components/Releases';
import { useArtistById } from 'src/hooks/artists';
import { useReleases } from 'src/hooks/releases';
import { getPrimaryArtistImage } from 'src/libs/artists';
import { parseSearchQuery, replacePath } from 'src/libs/paths';
import Pagination from 'src/components/Pagination';

const StyledArtist = styled.div`
  .jumbotron {
    text-align: center;
    margin-bottom: 4rem;
    padding: 2rem 0;
    background: none;

    img {
      max-height: 500px;
      width: auto;
      margin: 2rem 0;
    }
  }

  .filters {
    display: flex;
    margin-bottom: 2rem;

    .sorting {
      display: flex;
      align-items: center;
      flex-direction: row;

      > * {
        margin-right: 1rem;

        &::last-of-type {
          margin-right: 0;
        }
      }
    }

    .spacer {
      flex: 1 1 auto;
    }

    .pagination {
      align-items: flex-end;
    }
  }

  .releases {
    min-height: 500px;
  }
`;

// My one bugbear with React Query and Typescript....
const artistFallback = { name: '', realname: '', images: [] };
const artistImageFallback = { uri: '' };

export const ArtistPage: FC = () => {
  const router = useRouter();
  const handleReplacePath = replacePath(router);
  const { query } = router;

  const id = parseSearchQuery(query.id);
  const page = parseInt(parseSearchQuery(query.page) || '1');
  const sort = parseSearchQuery(query.sort || 'year');
  const sortOrder = parseSearchQuery(query.sortOrder, 'desc');
  const perPage = parseSearchQuery(query.perPage || '100');

  const {
    data: releasesData,
    isLoading: releasesIsLoading,
    error: releasesError,
  } = useReleases({ id, pageNumber: `${page}`, sort, sortOrder, perPage });

  const {
    data: artistData,
    isLoading: artistIsLoading,
    error: artistError,
  } = useArtistById({ id });

  const { name, images, realname } = artistData || artistFallback;

  const { uri } = useMemo(
    () => getPrimaryArtistImage(images || []) || artistImageFallback,
    [images]
  );

  if (artistIsLoading) return <Loading />;
  if (artistError) return <p>There was an error: {artistError.message}</p>;

  return (
    <StyledArtist>
      <div className="jumbotron">
        <h1 className="artist-name">{name}</h1>
        <img src={uri} />
        <h2 className="artist-real-name">{realname}</h2>
      </div>
      <div className="releases">
        <h4>Releases</h4>
        <div className="filters">
          <Form className="sorting">
            <Form.Group>
              <Form.Label htmlFor="sort-type-select">Sort By</Form.Label>
              <Form.Control
                id="sort-type-select"
                as="select"
                value={sort}
                onChange={(e) => {
                  const value = e.target.value as string;
                  handleReplacePath({ key: 'sort', value });
                }}
              >
                <option value="year">Year</option>
                <option value="title">Title</option>
                <option value="format">Format</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="sort-order-select">
                Sort Direction
              </Form.Label>
              <Form.Control
                id="sort-order-select"
                as="select"
                value={sortOrder}
                onChange={(e) => {
                  const value = e.target.value as string;
                  handleReplacePath({ key: 'sortOrder', value });
                }}
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="rows-per-page-select">
                Rows per page
              </Form.Label>
              <Form.Control
                id="rows-per-page-select"
                as="select"
                onChange={(e) => {
                  const value = e.target.value as string;
                  handleReplacePath({ key: 'perPage', value });
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
          <Pagination page={page} pages={releasesData?.pagination?.pages} />
        </div>
        <Releases
          releases={releasesData?.releases}
          isLoading={releasesIsLoading}
          error={releasesError}
        />
      </div>
    </StyledArtist>
  );
};

export default ArtistPage;
