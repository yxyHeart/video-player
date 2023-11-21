import React, { useRef, useState, useEffect} from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import MyAvatar from '@/components/Avatar';
import Logo from '@/components/Logo';
import {
  Router,
  RouterProvider,
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import MyRoutes from '@/router';
import MySearch from '@/components/Search';
import { RecoilRoot } from 'recoil';


const { Header, Content, Sider } = Layout;

const App: React.FC = () => {
  useEffect(()=>{
    document.body.style.overflow = 'hidden'
    return ()=>{
      document.body.style.overflow = 'auto'
    }
  },[])

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight)
  useEffect(()=>{
    const handleResize = ()=>{
      setWindowHeight(window.innerHeight)
    }
    window.addEventListener('resize', handleResize)
    return ()=>{
      window.removeEventListener('resize', handleResize)
    }
  },[])

  return (
    <RecoilRoot>
      <BrowserRouter>
        <Layout className='h-[100%]'>
          <Header style={{ display: 'flex', alignItems: 'center' }}>
            <Logo />
            <div className='flex grow-[1]' />
            <MySearch />
            <div className='flex grow-[1]' />
            <Navbar />
            <div className='flex grow-[0.05]' />
            <MyAvatar />
          </Header>
          <Layout>
            <Sider width={200} style={{ background: colorBgContainer }}>
              <Sidebar />
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Content
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: windowHeight*0.92,
                  background: colorBgContainer,
                }}
              
              >
                <MyRoutes />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;