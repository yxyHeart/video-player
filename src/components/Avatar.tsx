import React from "react";
import avatar from '/avatar.png'
import { Avatar } from "antd";
import { useRecoilState } from 'recoil';
import { isLoginState } from "@/store/UserStore.ts";
import LoginButton from '@/components/LoginButton'

const MyAvatar:React.FC = ()=>{
    const src = new URL(avatar, import.meta.url).href
    const [islogin, setIsLogin] = useRecoilState(isLoginState )
    console.log(islogin)
    return (
        islogin
            ?   <div className="flex h-[36px] w-[36px]">
                    <Avatar src={src} /> 
                </div>
            :   <LoginButton />
        
         
    )
}

export default MyAvatar