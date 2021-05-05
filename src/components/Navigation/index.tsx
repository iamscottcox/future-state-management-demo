import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import SettingsIcon from '@material-ui/icons/Settings';
import Link from 'next/link';
import styled from 'styled-components';

import store from 'src/state';

const StyledNavigation = styled.div`
  width: 100%;
  display: flex;
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
  <Navbar fixed="top" bg="primary" variant="dark">
    <Navbar.Brand>Demo</Navbar.Brand>
    <StyledNavigation>
      <Link href="/artists">
        <a>Artists</a>
      </Link>
      <Link href="/write">
        <a>Write</a>
      </Link>
      <div className="spacer" />
      <Link href="/settings">
        <Nav.Link>
          <SettingsIcon />
        </Nav.Link>
      </Link>
      <Button
        type="button"
        variant="secondary"
        onClick={() => {
          console.log('state', store.getState());
        }}
      >
        State
      </Button>
      <Button
        type="button"
        variant="secondary"
        onClick={() => {
          if (confirm('Are you sure you want to clear local storage?')) {
            localStorage.clear();
          }
        }}
      >
        Clear Local Storage
      </Button>
    </StyledNavigation>
  </Navbar>
);

export default Navigation;
