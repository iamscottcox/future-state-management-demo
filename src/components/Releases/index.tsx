import { FC } from 'react';
import { UseQueryResult } from 'react-query';
import styled from 'styled-components';

import ReleasePreview from 'src/components/Releases/ReleasePreview';
import Loading from 'src/components/Loading';

const StyledReleases = styled.div`
  display: flex;
  flex-direction: column;
`;

interface OwnProps {
  isLoading?: UseQueryResult['isLoading'];
  error: Error | null;
  releases?: API.Release[];
}

type Props = OwnProps;

export const Releases: FC<Props> = ({
  error,
  releases = [],
  isLoading = false,
}) => {
  if (isLoading) return <Loading isLoading={true} />;
  if (error) return <p>{error.message}</p>;

  return (
    <StyledReleases>
      {releases.map((release) => {
        const { id, title, thumb, year, main_release: mainRelease } = release;
        return (
          <ReleasePreview
            id={id}
            title={title}
            thumb={thumb}
            year={year}
            mainRelease={mainRelease}
          />
        );
      })}
    </StyledReleases>
  );
};

export default Releases;
