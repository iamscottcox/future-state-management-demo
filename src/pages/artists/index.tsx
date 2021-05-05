import { TablePagination } from '@material-ui/core';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { useRouter } from 'next/dist/client/router';
import { FC, useContext } from 'react';

import { Artists } from 'src/components/Artists';
import Search from 'src/components/Filters/Search';
import { useArtists } from 'src/hooks/artists';
import { createNewPath, parseSearchQuery } from 'src/libs/paths';
import { ArtistSearchContext } from 'src/state/contexts/artistSearch';
import styled from 'styled-components';

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

  const { isLoading, data, error } = useArtists({
    search: artistSearch,
    pageNumber: page,
    perPage,
  });

  const pages = data?.pagination?.items || 0;

  const handleSearchSubmit = (value: string) => {
    setArtistSearch(value);
    router.replace(createNewPath({ key: 'page', value: 1 }));
  };

  return (
    <StyledArtistsPage>
      <Jumbotron>
        <h1>Artists</h1>
      </Jumbotron>
      <div className="filters">
        <Search initialValue={artistSearch} onSubmit={handleSearchSubmit} />
        <div className="spacer" />
        <TablePagination
          align="left"
          component="div"
          count={data?.pagination?.items || 0}
          page={pages === 0 ? 0 : page - 1}
          onChangePage={(e, page) => {
            router.replace(createNewPath({ key: 'page', value: page + 1 }));
          }}
          rowsPerPage={parseInt(perPage)}
          onChangeRowsPerPage={(e) => {
            setPerPage(e.target.value);
            router.replace(createNewPath({ key: 'page', value: 1 }));
          }}
        />
      </div>
      <Artists artists={data?.results} isLoading={isLoading} error={error} />
    </StyledArtistsPage>
  );
};

export default ArtistsPage;
