import Link from 'next/link';
import store from 'src/state';
import styled from 'styled-components';

const StyledNav = styled.nav`
  display: flex;
  background: blue;

  a {
    padding: 0.5rem;
    color: white;
  }
`;

export const Navigation = () => (
  <StyledNav>
    <Link href="/artists">
      <a>Artists</a>
    </Link>
    <Link href="/write">
      <a>Write</a>
    </Link>
    <Link href="/settings">
      <a>🔧</a>
    </Link>
    <button
      type="button"
      onClick={() => {
        console.log('state', store.getState());
      }}
    >
      State
    </button>
    <button
      type="button"
      onClick={() => {
        localStorage.clear();
      }}
    >
      Clear Local Storage
    </button>
  </StyledNav>
);

export default Navigation;
