import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { FC } from 'react';
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
  return (
    <StyledArtistPreview key={id}>
      <Card>
        <Link href={`/artists/${id}`}>
          <a>
            <img
              src={
                coverImage.includes('spacer.gif')
                  ? 'https://via.placeholder.com/150'
                  : coverImage
              }
              alt={title}
            />
            <h5>{title}</h5>
          </a>
        </Link>
      </Card>
    </StyledArtistPreview>
  );
};

export default ArtistPreview;
