import { Card, Image, Item } from 'semantic-ui-react';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { Link } from '@material-ui/core';

interface OwnProps {
  id: string;
  title: string;
  coverImage?: string;
}

type Props = OwnProps;

const StyledArtistPreview = styled.div`
  margin-bottom: 1rem;

  .item {
    align-items: center;
  }
`;

export const ArtistPreview: FC<Props> = ({ title, id, coverImage = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <StyledArtistPreview key={id}>
      <Card
        raised={isHovered}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        fluid
      >
        <Link href={`/artists/${id}`}>
          <a>
            <Item.Group>
              <Item>
                <Item.Image
                  size="small"
                  src={
                    coverImage.includes('spacer.gif')
                      ? 'https://via.placeholder.com/150'
                      : coverImage
                  }
                />

                <Item.Content>
                  <Item.Header>{title}</Item.Header>
                </Item.Content>
              </Item>
            </Item.Group>
          </a>
        </Link>
      </Card>
    </StyledArtistPreview>
  );
};

export default ArtistPreview;
