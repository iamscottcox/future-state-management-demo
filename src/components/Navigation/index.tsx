import { useRouter } from 'next/dist/client/router';
import { MouseEvent as ReactMouseEvent, useState } from 'react';
import { Dropdown, Menu, MenuItemProps } from 'semantic-ui-react';

import store from 'src/state';

export const Navigation = () => {
  const [current, setCurrent] = useState<string>('/artists');
  const router = useRouter();

  const handleOnClick = (
    e: ReactMouseEvent<HTMLAnchorElement | HTMLDivElement, MouseEvent>,
    { name = '/artists' }: MenuItemProps
  ) => {
    setCurrent(name);
    router.push(name);
  };

  return (
    <Menu fixed="top">
      <Menu.Item
        name="/artists"
        active={current === '/artists'}
        onClick={handleOnClick}
      >
        Artists
      </Menu.Item>
      <Menu.Item
        name="/write"
        active={current === '/write'}
        onClick={handleOnClick}
      >
        Write
      </Menu.Item>
      <Menu.Menu position="right">
        <Dropdown text="Settings" pointing className="link item">
          <Dropdown.Menu>
            <Dropdown.Item
              active={current === '/settings'}
              onClick={() => {
                setCurrent('/settings');
                router.push('/settings');
              }}
            >
              Settings Page
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Debug</Dropdown.Header>
            <Dropdown.Item
              onClick={() => console.log('state', store.getState())}
            >
              Show State
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                localStorage.clear();
              }}
            >
              Clear Local Storage
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  );
};

export default Navigation;
