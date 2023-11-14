import React from "react";
import avatar from '/avatar.png'
import { Avatar } from "antd";

const MyAvatar:React.FC = ()=>{
    const src = new URL(avatar, import.meta.url).href
    return (
        <div className="flex h-[36px] w-[36px] ">
            <Avatar src={src} />
        </div>
            
    )
}

export default MyAvatar