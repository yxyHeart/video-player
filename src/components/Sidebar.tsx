import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  { type: 'divider' },
  getItem('首页', 'home', <SettingOutlined />),
  { type: 'divider' },
  getItem('推荐', 'recommend', <SettingOutlined />),
  { type: 'divider' },
  getItem('关注', 'subscription', <SettingOutlined />),
  { type: 'divider' },
  getItem('朋友', 'friends', <SettingOutlined />),
  { type: 'divider' },
  getItem('我的', 'myInfo', <SettingOutlined />),
  { type: 'divider' },

];

const Sidebar: React.FC = () => {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  return (
    <Menu
      onClick={onClick}
      // style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
};

export default Sidebar;