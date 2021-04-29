import { Card, Typography } from '@material-ui/core';
import Link from 'next/link';
import { FC, useState } from 'react';
import styled from 'styled-components';

interface OwnProps {
  id: string;
  title: string;
  coverImage?: string;
}

type Props = OwnProps;

const StyledArtistPreview = styled.div`
  margin-bottom: 1rem;

  a {
    display: flex;
    align-items: center;

    img {
      width: 150px;
      margin-right: 1rem;
    }
  }
`;

export const ArtistPreview: FC<Props> = ({ title, id, coverImage = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <StyledArtistPreview
      key={id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card raised={isHovered}>
        <Link href={`/artists/${id}`}>
          <a>
            <img
              className="artists-list-item-image"
              src={
                coverImage.includes('spacer.gif')
                  ? 'https://via.placeholder.com/150'
                  : coverImage
              }
              alt={title}
            />
            <Typography variant="h5">{title}</Typography>
          </a>
        </Link>
      </Card>
    </StyledArtistPreview>
  );
};

export default ArtistPreview;
