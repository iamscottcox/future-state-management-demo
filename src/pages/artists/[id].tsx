import {
  MenuItem,
  Select,
  TablePagination,
  Typography,
} from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import { FC, useMemo, useState } from 'react';
import styled from 'styled-components';

import { Loading } from 'src/components/Loading';
import Releases from 'src/components/Releases';
import { useArtistById } from 'src/hooks/artists';
import { useReleases } from 'src/hooks/releases';
import { getPrimaryArtistImage } from 'src/libs/artists';
import { createNewPath, parseSearchQuery, replacePath } from 'src/libs/paths';

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
          <div className="sorting">
            <Select
              value={sort}
              onChange={(e) => {
                const value = e.target.value as string;
                handleReplacePath({ key: 'sort', value });
              }}
            >
              <MenuItem value="year">Year</MenuItem>
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="format">Format</MenuItem>
            </Select>
            <Select
              value={sortOrder}
              onChange={(e) => {
                const value = e.target.value as string;
                handleReplacePath({ key: 'sortOrder', value });
              }}
            >
              <MenuItem value="desc">Descending</MenuItem>
              <MenuItem value="asc">Ascending</MenuItem>
            </Select>
          </div>
          <div className="spacer" />
          <TablePagination
            align="left"
            component="div"
            count={releasesData?.pagination?.items || 0}
            page={releasesData?.pagination?.pages === 0 ? 0 : page - 1}
            onChangePage={(e, page) => {
              router.replace(createNewPath({ key: 'page', value: page + 1 }));
            }}
            rowsPerPage={parseInt(`${perPage}`)}
            onChangeRowsPerPage={(e) => {
              router.replace(
                createNewPath([
                  { key: 'perPage', value: e.target.value },
                  { key: 'page', value: 1 },
                ])
              );
            }}
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
