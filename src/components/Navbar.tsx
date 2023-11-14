import React, { useState } from 'react';
import { Button, Divider, Flex, Radio, Menu, MenuProps} from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { DownloadOutlined ,AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];
const Navbar: React.FC = () => {
    const [size, setSize] = useState<SizeType>('large'); // default is 'middle'
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
   
        getItem('充值', 'home', <SettingOutlined />),
       
        getItem('客户端', 'recommend', <SettingOutlined />),
       
        getItem('通知', 'topUp', <SettingOutlined />),

        getItem('私信', 'chat', <SettingOutlined />),

        getItem('投稿', 'post', <SettingOutlined />),
  
      ];
    return (

        <Menu 
            theme="dark" 
            mode="horizontal" 
            defaultSelectedKeys={['2']} 
            items={items} 
        />
        
    );
  };
  
  export default Navbar;