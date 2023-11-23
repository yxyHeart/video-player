import React, { useState } from 'react';
import { Button, Divider, Flex, Radio, Menu, MenuProps} from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { DownloadOutlined ,AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { NavbarItem } from '@/components/Items/NavbarItem';
import NavbarPostButton from '@/components/NavbarPostButton';


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
   
        getItem(
          <NavbarItem icon={<SettingOutlined />} text={'充值'} />,
          'topUp'
        ),
       
        getItem(
          <NavbarItem icon={<SettingOutlined />} text={'客户端'} />,
          'client', 
        ),
       
        getItem(<NavbarItem icon={<SettingOutlined />} text={'通知'} />, 'notification'),

        getItem(<NavbarItem icon={<SettingOutlined />} text={'私信'} />, 'chat'),

        getItem(<NavbarPostButton />, 'post'),
  
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