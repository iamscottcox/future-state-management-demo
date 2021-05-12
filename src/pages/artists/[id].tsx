import { useRouter } from 'next/dist/client/router';
import { FC, useMemo } from 'react';
import styled from 'styled-components';

// components
import { Loading } from 'src/components/Loading';
import Pagination from 'src/components/Pagination';
import Releases from 'src/components/Releases';
// hooks
import { useArtistById } from 'src/hooks/artists';
import { useReleases } from 'src/hooks/releases';
// libs
import { getPrimaryArtistImage } from 'src/libs/artists';
import { parseSearchQuery, replacePath } from 'src/libs/paths';
import { HTMLSelect } from '@blueprintjs/core';

const StyledArtist = styled.div`
  .jumbotron {
    text-align: center;
    margin-bottom: 4rem;
    background: none;

    img {
      max-height: 400px;
      width: auto;
      margin: 2rem 0;
    }
  }

  .filters {
    display: flex;
    margin-bottom: 2rem;
    align-items: flex-end;

    > * {
      margin-right: 1rem;

      &:last-child {
        margin-right: 0;
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

  const pages = releasesData?.pagination?.pages || 0;

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
        <h3>Releases</h3>
        <div className="filters">
          <div>
            <p>
              <label>Sort By</label>
            </p>
            <HTMLSelect
              value={sort}
              onChange={(e) => {
                handleReplacePath({ key: 'sort', value: e.target.value });
              }}
            >
              <option value="year">Year</option>
              <option value="title">Title</option>
              <option value="format">Format</option>
            </HTMLSelect>
          </div>
          <div>
            <p>
              <label>Sort Order</label>
            </p>
            <HTMLSelect
              value={sortOrder}
              onChange={(e) => {
                handleReplacePath({ key: 'sortOrder', value: e.target.value });
              }}
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </HTMLSelect>
          </div>
          <div className="spacer" />
          <div className="per-page-select-wrapper">
            <p>
              <label>Per Page</label>
            </p>
            <HTMLSelect
              value={perPage}
              onChange={(e) =>
                handleReplacePath([
                  { key: 'perPage', value: e.target.value },
                  { key: 'page', value: 1 },
                ])
              }
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </HTMLSelect>
          </div>
          <Pagination pages={pages} page={page} />
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
