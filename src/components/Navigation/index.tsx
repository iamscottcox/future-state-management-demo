import {
  Alignment,
  Button,
  Menu,
  MenuDivider,
  MenuItem,
  Navbar,
  Position,
} from '@blueprintjs/core';
import { Popover2 as Popover } from '@blueprintjs/popover2';
import { MenuInfo } from 'rc-menu/lib/interface';

import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import store from 'src/state';
import Link from 'next/link';
import styled from 'styled-components';

const SettingsMenu = () => {
  return (
    <Menu>
      <MenuItem
        icon="cog"
        text={
          <Link href="/settings">
            <a>Settings Page</a>
          </Link>
        }
      />
      <MenuDivider />
      <MenuItem text="Debug">
        <MenuItem
          text="Show State"
          onClick={() => console.log('state', store.getState())}
        />
        <MenuItem
          text="Clear Local Storage"
          onClick={() => localStorage.clear()}
        />
      </MenuItem>
    </Menu>
  );
};

const StyledNavigation = styled(Navbar)`
  .links {
    display: flex;
    align-items: center;

    a {
      margin-right: 0.5rem;

      &::last-of-type {
        margin-right: none;
      }
    }
  }
`;

export const Navigation = () => {
  const [current, setCurrent] = useState<string[]>([]);
  const router = useRouter();

  const handleClick = (route: string) => ({ key }: MenuInfo) => {
    setCurrent([key as string]);
    router.push(route);
  };

  return (
    <StyledNavigation className="navbar" fixedToTop>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>Demo</Navbar.Heading>
        <Navbar.Divider />
      </Navbar.Group>
      <Navbar.Group className="links">
        <Link href="/artists">
          <a>Artists</a>
        </Link>
        <Link href="/write">
          <a>Write</a>
        </Link>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Popover content={<SettingsMenu />} position={Position.BOTTOM_LEFT}>
          <Button icon="cog" text="Settings" />
        </Popover>
      </Navbar.Group>
    </StyledNavigation>
    // <Menu mode="horizontal" selectedKeys={current}>
    //   <Menu.Item key="artists" onClick={handleClick('/artists')}>
    //     Artists
    //   </Menu.Item>
    //   <Menu.Item title="Write" key="write" onClick={handleClick('/write')}>
    //     Write
    //   </Menu.Item>
    //   <SubMenu
    //     style={{ float: 'right' }}
    //     key="SubMenu"
    //     icon={<SettingOutlined />}
    //     title="Settings"
    //   >
    //     <Menu.Item key="settings" onClick={handleClick('/settings')}>
    //       Settings Page
    //     </Menu.Item>
    //     <Menu.ItemGroup title="Debug">
    //       <Menu.Item
    //         key="show-state"
    //         onClick={() => {
    //           console.log('state', store.getState());
    //         }}
    //       >
    //         Show State
    //       </Menu.Item>
    //       <Menu.Item
    //         key="clear-local-storage"
    //         onClick={() => {
    //           if (confirm('Are you sure you want to clear local storage?')) {
    //             localStorage.clear();
    //           }
    //         }}
    //       >
    //         Clear Local Storage
    //       </Menu.Item>
    //     </Menu.ItemGroup>
    //   </SubMenu>
    // </Menu>
  );
};

export default Navigation;
