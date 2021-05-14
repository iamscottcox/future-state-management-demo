import {
  AppBar,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import Link from 'next/link';
import styled from 'styled-components';

import store from 'src/state';
import theme from 'src/theme';
import { useState } from 'react';
import { replacePath } from 'src/libs/paths';
import { useRouter } from 'next/dist/client/router';
import { Title } from '@material-ui/icons';

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

export const Navigation = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
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
          <IconButton
            color="inherit"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <SettingsIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                router.push('/settings');
                handleClose();
              }}
            >
              Settings Page
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={() => {
                handleClose();
                console.log('state', store.getState());
              }}
            >
              Show State
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                localStorage.clear();
              }}
            >
              Clear Local Storage
            </MenuItem>
          </Menu>

          {/* <Link href="/settings">
            <a>
              
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
          </Button> */}
        </StyledNavigation>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
