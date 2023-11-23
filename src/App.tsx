import React, { useRef, useState, useEffect} from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import AvatarOrLoginButton from '@/components/AvatarOrLoginButton';
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
import { Provider } from 'react-redux';
import store from '@/store/store'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

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
  
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Layout className='h-[100%]'>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
              <Logo />
              <div className='flex grow-[1]' />
              <MySearch />
              <div className='flex grow-[0.3]' />
              <Navbar />
              <div className='flex grow-[0.05]' />
              <AvatarOrLoginButton />
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
      </PersistGate>
    </Provider>
  );
};

export default App;