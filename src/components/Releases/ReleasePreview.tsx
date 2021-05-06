import Title from 'antd/lib/typography/Title';
import { FC } from 'react';
import Card from 'react-bootstrap/Card';
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

  & .card {
    display: flex;
    align-items: center;
    flex-direction: row;

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
            thumb.includes('spacer.gif')
              ? 'https://via.placeholder.com/150'
              : thumb
          }
          alt={title}
        />
        <Title level={5}>
          {title} ({year})
        </Title>
      </Card>
    </StyledReleasePreview>
  );
};

export default ReleasePreview;
