import { Button, Icon } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import Link from 'next/link';
import store from 'src/state';
import styled from 'styled-components';

const StyledNav = styled.nav`
  display: flex;
  background: blue;
  padding: 0.5rem;

  a {
    padding: 0.5rem;
    color: white;
  }

  .spacer {
    flex: 1 1 auto;
  }

  button {
    margin: 0 0.25rem;
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
    <div className="spacer" />
    <Link href="/settings">
      <a>
        <SettingsIcon />
      </a>
    </Link>
    <Button
      type="button"
      color="primary"
      variant="contained"
      onClick={() => {
        console.log('state', store.getState());
      }}
    >
      State
    </Button>
    <Button
      type="button"
      color="primary"
      variant="contained"
      onClick={() => {
        localStorage.clear();
      }}
    >
      Clear Local Storage
    </Button>
  </StyledNav>
);

export default Navigation;
