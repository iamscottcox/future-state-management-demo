import { Card } from 'antd';
import Link from 'next/link';
import { FC } from 'react';
import styled from 'styled-components';
import Title from 'antd/lib/typography/Title';

interface OwnProps {
  id: string;
  title: string;
  coverImage?: string;
}

type Props = OwnProps;

const StyledArtistPreview = styled.div`
  margin-bottom: 1rem;

  .ant-card-body {
    padding: 0;

    a {
      display: flex;
      align-items: center;

      img {
        width: 150px;
        margin-right: 1rem;
      }
    }
  }
`;

export const ArtistPreview: FC<Props> = ({ title, id, coverImage = '' }) => {
  return (
    <StyledArtistPreview key={id}>
      <Card hoverable>
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
            <Title level={5}>{title}</Title>
          </a>
        </Link>
      </Card>
    </StyledArtistPreview>
  );
};

export default ArtistPreview;
