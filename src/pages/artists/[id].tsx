import {
  Pagination,
  Divider,
  Select,
  Header,
  PaginationProps,
} from 'semantic-ui-react';
import { useRouter } from 'next/dist/client/router';
import { FC, useMemo, MouseEvent as ReactMouseEvent } from 'react';
import styled from 'styled-components';

import { Loading } from 'src/components/Loading';
import Releases from 'src/components/Releases';
import { useArtistById } from 'src/hooks/artists';
import { useReleases } from 'src/hooks/releases';
import { getPrimaryArtistImage } from 'src/libs/artists';
import { parseSearchQuery, replacePath } from 'src/libs/paths';

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
    align-items: center;

    > * {
      margin-right: 0.5rem;

      &::last-of-type {
        margin-right: none;
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

  const handlePaginationChange = (
    e: ReactMouseEvent<HTMLAnchorElement, MouseEvent>,
    { activePage }: PaginationProps
  ) => {
    handleReplacePath({ key: 'page', value: activePage });
  };

  if (artistIsLoading) return <Loading />;
  if (artistError) return <p>There was an error: {artistError.message}</p>;

  return (
    <StyledArtist>
      <div className="jumbotron">
        <Header size="huge" className="artist-name">
          {name}
        </Header>
        <img src={uri} />
        <Header size="large" className="artist-real-name">
          {realname}
        </Header>
      </div>
      <Divider />
      <div className="releases">
        <Header size="medium">Releases</Header>
        <div className="filters">
          <Select
            value={sort}
            onChange={(e, data) => {
              const value = data.value as string;
              handleReplacePath({ key: 'sort', value });
            }}
            options={[
              { key: 'year', value: 'year', text: 'Year' },
              { key: 'title', value: 'title', text: 'Title' },
              { key: 'format', value: 'format', text: 'Format' },
            ]}
          />
          <Select
            value={sortOrder}
            onChange={(e, data) => {
              const value = data.value as string;
              handleReplacePath({ key: 'sortOrder', value });
            }}
            options={[
              { key: 'desc', value: 'desc', text: 'Descending' },
              { key: 'asc', value: 'asc', text: 'Ascending' },
            ]}
          />

          <div className="spacer" />
          <Pagination
            activePage={page}
            onPageChange={handlePaginationChange}
            totalPages={releasesData?.pagination?.pages}
          />
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
