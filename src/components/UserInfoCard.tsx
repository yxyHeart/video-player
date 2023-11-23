import { Card } from "antd";
import React, { RefObject, useEffect } from "react";
import { DownloadOutlined, HeartTwoTone,VideoCameraTwoTone,StarTwoTone,EyeTwoTone } from '@ant-design/icons';
import { useAppSelector } from "@/hooks/useRedux";

const UserInfoCard = React.forwardRef<HTMLDivElement>((props,ref)=>{
    const isLogin = useAppSelector(state=>state.user.isLogin)

    return (
        <Card 
            ref={ref}
            title={isLogin?"我的信息":"登录后即可观看喜欢、收藏的视频"} 
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
    )
})

export default UserInfoCard
