import React, { useState, useRef, useEffect } from 'react';
import { DownloadOutlined, HeartTwoTone,VideoCameraTwoTone,StarTwoTone,EyeTwoTone } from '@ant-design/icons';
import { Button, Divider, Flex, Radio, Card, Modal, Segmented, QRCode, } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { CompoundedComponent } from 'antd/es/float-button/interface';
import { CardInterface } from 'antd/es/card';
import LoginWithUsernamePassword from '@/components/LoginWithUsernamePassword';


const LoginButton: React.FC = () => {
    const [size, setSize] = useState<SizeType>('large'); // default is 'middle'
    const cardRef:React.Ref<HTMLDivElement> | undefined = useRef<HTMLDivElement>(null)
    const buttonRef:React.Ref<HTMLElement> | undefined = useRef<HTMLElement>(null)
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [loginMethod, setLoginMethod] = useState<number>(3)
  
    const showModal = () => {
      setOpen(true);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
      };

    useEffect(()=>{
        const handleMouseOver = function(){
            if(cardRef.current){
                cardRef.current.style.display = 'block'
            }
        }
        const handleMouseOut = function(){
            if(cardRef.current){
                cardRef.current.style.display = 'none'
            }
        }
        buttonRef.current?.addEventListener('mouseover',handleMouseOver)
        buttonRef.current?.addEventListener('mouseout', handleMouseOut)
        return ()=>{
            buttonRef.current?.removeEventListener('mouseover',handleMouseOver)
            buttonRef.current?.removeEventListener('mouseout',handleMouseOut)
        }
    },[])
    return (
        <>
            <Button ref={buttonRef} type="primary" icon={<DownloadOutlined />} size={size} onClick={showModal}>
                登录
            </Button>
            <Card 
                ref={cardRef} 
                title="登录后即可观看喜欢、收藏的视频" 
                bordered={false} 
                style={{ 
                    width: '20%', 
                    position:'absolute', 
                    
                    right:'1%', 
                    top:'8%', 
                    zIndex:1,
                   
                }}>
                    <div className='flex items-center justify-around'>
                        <div className='flex flex-col items-center'>
                            <VideoCameraTwoTone />
                            <p>我的作品</p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <HeartTwoTone/>
                            <p>我的喜欢</p>
                        </div>
                        
                        <div className='flex flex-col items-center'>
                            <StarTwoTone />
                            <p>我的收藏</p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <EyeTwoTone />
                            <p>观看历史</p>
                        </div>
                    </div>
                
            </Card>

            <Modal
                title="Title"
                open={open}
                okButtonProps={{ className:"hidden" }}
                cancelButtonProps={{ className:"hidden" }}
                onCancel={handleCancel}
                
            >   
                <div className='flex flex-col items-center content-between'>
                    <Segmented
                        onChange={(value)=>{setLoginMethod(Number(value))}}
                        style={{}}
                        options={[
                            {
                            label: (
                                <div style={{ padding: 8 }}>
                                <div>扫码登录</div>
                                </div>
                            ),
                            value: '1',
                            },
                            {
                            label: (
                                <div style={{ padding: 8 }}>
                                <div>验证码登录</div>
                                </div>
                            ),
                            value: '2',
                            },
                            {
                            label: (
                                <div style={{ padding: 8 }}>
                                <div>密码登录</div>
                                </div>
                            ),
                            value: '3',
                            },

                        ]}
                    />
                    <div className='mt-[30px]'>
                        {loginMethod===1 && <QRCode value={'https://ant.design/' || '-'} />}
                        {loginMethod===2 && <LoginWithUsernamePassword />}
                        {loginMethod===3 && <LoginWithUsernamePassword />}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default LoginButton;