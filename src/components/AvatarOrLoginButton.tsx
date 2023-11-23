import React from "react";
import avatar from '/avatar.png'
import { Avatar } from "antd";

import { useAppSelector } from "@/hooks/useRedux";

import LoginButton from '@/components/LoginButton'
import UserInfoCard from "./UserInfoCard";
import MyAvatar from "@/components/Avatar";


const AvatarOrLoginButton:React.FC = ()=>{
    const src = new URL(avatar, import.meta.url).href
    const isLogin = useAppSelector(state=>state.user.isLogin)
    return (
        isLogin
            ?   <MyAvatar />
            :   <LoginButton />
        
         
    )
}

export default AvatarOrLoginButton