import { Card, Item } from 'semantic-ui-react';
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
  return (
    <StyledReleasePreview key={`${mainRelease}-${id}`}>
      <Card fluid>
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
    </StyledReleasePreview>
  );
};

export default ReleasePreview;
