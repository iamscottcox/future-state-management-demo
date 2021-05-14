import { Card, Typography } from '@material-ui/core';
import { FC } from 'react';
import styled from 'styled-components';

interface OwnProps {
  id: number;
  title: string;
  mainRelease: number;
  year: number;
  thumb?: string;
}

type Props = OwnProps;

const StyledReleasePreview = styled.div`
  display: flex;
  margin-bottom: 1rem;

  & .MuiCard-root {
    display: flex;
    align-items: center;
    flex: 1 1 auto;
    min-height: 100px;

    img {
      width: 150px;
      margin-right: 1rem;
    }
  }
`;

export const ReleasePreview: FC<Props> = ({
  title,
  id,
  mainRelease,
  year,
  thumb = '',
}) => {
  return (
    <StyledReleasePreview key={`${mainRelease}-${id}`}>
      <Card>
        <img
          className="release-preview"
          src={
            thumb && thumb.includes('spacer.gif')
              ? 'https://via.placeholder.com/150'
              : thumb
          }
          alt={title}
        />
        <Typography variant="h5">
          {title} ({year})
        </Typography>
      </Card>
    </StyledReleasePreview>
  );
};

export default ReleasePreview;
