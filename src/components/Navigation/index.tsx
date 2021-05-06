import { Menu } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';

import { useRouter } from 'next/dist/client/router';
import SubMenu from 'antd/lib/menu/SubMenu';
import { SettingOutlined } from '@ant-design/icons';
import { useState } from 'react';
import store from 'src/state';

export const Navigation = () => {
  const [current, setCurrent] = useState<string[]>([]);
  const router = useRouter();

  const handleClick = (route: string) => ({ key }: MenuInfo) => {
    setCurrent([key as string]);
    router.push(route);
  };

  return (
    <Menu mode="horizontal" selectedKeys={current}>
      <Menu.Item key="artists" onClick={handleClick('/artists')}>
        Artists
      </Menu.Item>
      <Menu.Item title="Write" key="write" onClick={handleClick('/write')}>
        Write
      </Menu.Item>
      <SubMenu
        style={{ float: 'right' }}
        key="SubMenu"
        icon={<SettingOutlined />}
        title="Settings"
      >
        <Menu.Item key="settings" onClick={handleClick('/settings')}>
          Settings Page
        </Menu.Item>
        <Menu.ItemGroup title="Debug">
          <Menu.Item
            key="show-state"
            onClick={() => {
              console.log('state', store.getState());
            }}
          >
            Show State
          </Menu.Item>
          <Menu.Item
            key="clear-local-storage"
            onClick={() => {
              if (confirm('Are you sure you want to clear local storage?')) {
                localStorage.clear();
              }
            }}
          >
            Clear Local Storage
          </Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>

      {/* <Link href="/artists">
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
        onClick={() => {
          console.log('state', store.getState());
        }}
      >
        State
      </Button>
      <Button
        onClick={() => {
          if (confirm('Are you sure you want to clear local storage?')) {
            localStorage.clear();
          }
        }}
      >
        Clear Local Storage
      </Button> */}
    </Menu>
  );
};

export default Navigation;
