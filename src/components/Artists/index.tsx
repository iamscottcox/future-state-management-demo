import { FC } from 'react';
import { UseQueryResult } from 'react-query';
import styled from 'styled-components';

import ArtistPreview from 'src/components/Artists/ArtistPreview';
import Loading from 'src/components/Loading';

interface OwnProps {
  isLoading?: UseQueryResult['isLoading'];
  error: Error | null;
  artists?: API.ArtistPreview[];
}

type Props = OwnProps;

const StyledArtists = styled.div`
  display: flex;
  flex-flow: column wrap;
`;

export const Artists: FC<Props> = ({
  artists = [],
  isLoading = false,
  error,
}) => {
  if (isLoading) return <Loading />;
  if (error) return <p>{error.message}</p>;

  return (
    <StyledArtists>
      {artists &&
        artists?.map(({ title, id, cover_image: coverImage }) => {
          return (
            <ArtistPreview title={title} id={id} coverImage={coverImage} />
          );
        })}
    </StyledArtists>
  );
};

export default Artists;
