import Spinner from 'react-bootstrap/Spinner';
import { FC } from 'react';
import styled from 'styled-components';

const StyledCircularProgress = styled.div`
  display: flex;
  justify-content: center;
  padding: 5rem 0;
`;

interface OwnProps {
  isLoading?: boolean;
}

type Props = OwnProps;

export const Loading: FC<Props> = ({ isLoading = true }) => {
  return isLoading ? (
    <StyledCircularProgress>
      <Spinner animation="border" variant="primary" />
    </StyledCircularProgress>
  ) : null;
};

export default Loading;
