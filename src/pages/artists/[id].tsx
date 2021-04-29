import { useRouter } from 'next/dist/client/router';
import { FC, useMemo } from 'react';
import styled from 'styled-components';

import { Select } from 'src/components/Filters/Select';
import { Pagination } from 'src/components/Pagination';
import Releases from 'src/components/Releases';
import { useArtistById } from 'src/hooks/artists';
import { useReleases } from 'src/hooks/releases';
import { getPrimaryArtistImage } from 'src/libs/artists';
import { parseSearchQuery, replacePath } from 'src/libs/paths';

const StyledArtist = styled.div`
  .jumbotron {
    text-align: center;
  }

  .releases {
    min-height: 500px;
    text-align: center;
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
  const sort = parseSearchQuery(query.sort);
  const sortOrder = parseSearchQuery(query.sortOrder);

  const {
    data: releasesData,
    isLoading: releasesIsLoading,
    error: releasesError,
  } = useReleases({ id, pageNumber: page, sort, sortOrder });
  const {
    data: artistData,
    isLoading: artistIsLoading,
    error: artistError,
  } = useArtistById({ id });

  const { name, images, realname } = artistData || artistFallback;
  const { uri } = useMemo(
    () => getPrimaryArtistImage(images) || artistImageFallback,
    [images]
  );

  if (artistIsLoading) return <p>Loading...</p>;
  if (artistError) return <p>There was an error: {artistError.message}</p>;

  return (
    <StyledArtist>
      <div className="jumbotron">
        <h1>{name}</h1>
        <img src={uri} />
        <h4>{realname}</h4>
      </div>
      <div className="releases">
        <h2>Releases</h2>
        <Pagination page={page} pages={releasesData?.pagination?.pages} />
        <div className="filters">
          <Select
            value={sort}
            onChange={(value) => {
              handleReplacePath({ key: 'sort', value });
            }}
          >
            <option value="year">Year</option>
            <option value="title">Title</option>
            <option value="format">Format</option>
          </Select>
          <Select
            value={sortOrder}
            onChange={(value) => {
              handleReplacePath({ key: 'sortOrder', value });
            }}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </Select>
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
