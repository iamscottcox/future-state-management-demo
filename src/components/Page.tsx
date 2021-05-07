import { FC } from 'react';
import styled from 'styled-components';

import Navigation from 'src/components/Navigation';
import Layout, { Content, Header } from 'antd/lib/layout/layout';

const InnerStyles = styled.div`
  max-width: var(--maxWidth, 1000px);
  margin: 0 auto;
  padding: 6rem 2rem 0;
  min-height: 100vh;
`;

export const Page: FC = ({ children }) => (
  <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%', padding: 0 }}>
      <Navigation />
    </Header>
    <Content>
      <InnerStyles>{children}</InnerStyles>
    </Content>
  </Layout>
);

export default Page;
