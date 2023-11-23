import React, { useState, useRef, useEffect } from 'react';
import { DownloadOutlined, HeartTwoTone,VideoCameraTwoTone,StarTwoTone,EyeTwoTone } from '@ant-design/icons';
import { Button, Divider, Flex, Radio, Card, Modal, Segmented, QRCode, } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { CompoundedComponent } from 'antd/es/float-button/interface';
import { CardInterface } from 'antd/es/card';
import LoginWithUsernamePassword from '@/components/LoginWithUsernamePassword';
import sleep from '@/utils/sleep';
import UserInfoCard from '@/components/UserInfoCard';
import LoginDialogue from '@/components/LoginDialogue';


const LoginButton: React.FC = () => {
    const [size, setSize] = useState<SizeType>('large'); // default is 'middle'
    const cardRef:React.Ref<HTMLDivElement> | undefined = useRef<HTMLDivElement>(null)
    const buttonRef:React.Ref<HTMLElement> | undefined = useRef<HTMLElement>(null)
    const [open, setOpen] = useState(false);
    const loginMethod = useRef<number>(3)
    const isMouseOnCard = useRef<boolean>(false)
    const showModal = () => {
      setOpen(true);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    useEffect(()=>{
        if(cardRef.current){
            cardRef.current.style.display = 'none'
        }
        const handleMouseOverButton = function(){
            if(cardRef.current){
                cardRef.current.style.display = 'block'
            }
        }
        const handleMouseOutButton = async function(){
            if(cardRef.current){
                await sleep(1000)
                if(isMouseOnCard.current) return
                cardRef.current.style.display = 'none'
                isMouseOnCard.current = false
            }
        }
        const handleMouseOverCard = function(){
            if(cardRef.current){
                isMouseOnCard.current = true
                cardRef.current.style.display = 'block'
            }
        }
        const handleMouseOutCard = function(){
            if(cardRef.current){
                isMouseOnCard.current = false
                cardRef.current.style.display = 'none'
            }
        }

        buttonRef.current?.addEventListener('mouseover',handleMouseOverButton)
        buttonRef.current?.addEventListener('mouseout', handleMouseOutButton)
        cardRef.current?.addEventListener('mouseover',handleMouseOverCard)
        cardRef.current?.addEventListener('mouseout',handleMouseOutCard)
        return ()=>{
            buttonRef.current?.removeEventListener('mouseover',handleMouseOverButton)
            buttonRef.current?.removeEventListener('mouseout',handleMouseOutButton)
            cardRef.current?.removeEventListener('mouseover',handleMouseOverCard)
            cardRef.current?.removeEventListener('mouseout',handleMouseOutCard)
        }
    },[])
    return (
        <>
            <Button ref={buttonRef} type="primary" icon={<DownloadOutlined />} size={size} onClick={showModal}>
                登录
            </Button>
            <UserInfoCard ref={cardRef} />
            <LoginDialogue open={open} setOpen={setOpen}/>

        </>
    );
};

export default LoginButton;