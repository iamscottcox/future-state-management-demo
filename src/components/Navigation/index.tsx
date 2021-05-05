import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import Link from 'next/link';
import styled from 'styled-components';

import store from 'src/state';
import theme from 'src/theme';

const StyledNavigation = styled.div`
  width: 100%;
  display: flex;
  background: ${theme.palette.primary.main};
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
  <AppBar position="fixed">
    <Toolbar>
      <StyledNavigation>
        <Link href="/artists">
          <a>
            <Typography variant="body1">Artists</Typography>
          </a>
        </Link>
        <Link href="/write">
          <a>
            <Typography variant="body1">Write</Typography>
          </a>
        </Link>
        <div className="spacer" />
        <Link href="/settings">
          <a>
            <SettingsIcon />
          </a>
        </Link>
        <Button
          type="button"
          color="secondary"
          variant="contained"
          onClick={() => {
            console.log('state', store.getState());
          }}
        >
          State
        </Button>
        <Button
          type="button"
          color="secondary"
          variant="contained"
          onClick={() => {
            if (confirm('Are you sure you want to clear local storage?')) {
              localStorage.clear();
            }
          }}
        >
          Clear Local Storage
        </Button>
      </StyledNavigation>
    </Toolbar>
  </AppBar>
);

export default Navigation;
