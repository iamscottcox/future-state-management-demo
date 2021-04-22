import { FC } from 'react';
import styled from 'styled-components';

import Navigation from 'src/components/Navigation';

const InnerStyles = styled.div`
    max-width: var(--maxWidth, 1000px);
    margin: 0 auto;
    padding: 0 1rem;
`;

export const Page: FC = ({ children }) => (
  <div>
    <Navigation />
    <InnerStyles>
      {children}
    </InnerStyles>
  </div>
);

export default Page;
