import { Card, Item } from 'semantic-ui-react';
import { FC, useState } from 'react';
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
  margin-bottom: 1rem;

  .item {
    align-items: center;
  }
`;

export const ReleasePreview: FC<Props> = ({
  title,
  id,
  mainRelease,
  year,
  thumb = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <StyledReleasePreview key={`${mainRelease}-${id}`}>
      <Card
        raised={isHovered}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        fluid
      >
        <Item.Group>
          <Item>
            <Item.Image
              size="small"
              src={
                thumb.includes('spacer.gif')
                  ? 'https://via.placeholder.com/150'
                  : thumb
              }
            />

            <Item.Content>
              <Item.Header>
                {title} ({year})
              </Item.Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Card>

      {/*
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
      */}
    </StyledReleasePreview>
  );
};

export default ReleasePreview;
