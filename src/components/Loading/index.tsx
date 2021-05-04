import { CircularProgress } from '@material-ui/core';
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
      <CircularProgress className="loading-spinner" />
    </StyledCircularProgress>
  ) : null;
};

export default Loading;
