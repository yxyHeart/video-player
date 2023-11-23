import React from 'react';
import { 
  AppstoreOutlined, 
  MailOutlined, 
  SettingOutlined, 
  FireTwoTone,
  UserOutlined 
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';


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
  getItem('推荐', 'recommend', <FireTwoTone />),
  { type: 'divider' },
  getItem('关注', 'subscription', <SettingOutlined />),
  { type: 'divider' },
  getItem('朋友', 'friends', <SettingOutlined />),
  { type: 'divider' },
  getItem('我的', 'mine', <UserOutlined />),
  { type: 'divider' },

];

const Sidebar: React.FC = () => {
  const onClick: MenuProps['onClick'] = (e) => {
    const { key } = e
    if(key === 'home'){
      navigate('/')
    }else if(key === 'recommend'){
      navigate('/recommend')
    }else if(key === 'subscription'){
      navigate('subscription')
    }else if(key === 'friends'){
      navigate('friends')
    }else if(key === 'mine'){
      navigate('mine')
    }
  };
  const navigate = useNavigate()
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