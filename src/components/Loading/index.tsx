import { FC } from 'react';
import { Loader } from 'semantic-ui-react';
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
      <Loader active={isLoading} centered inline />
    </StyledCircularProgress>
  ) : null;
};

export default Loading;
