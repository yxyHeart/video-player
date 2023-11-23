import { useAppSelector } from "@/hooks/useRedux";
import { Avatar, Divider, Segmented } from "antd";
import React from "react";



const Mine:React.FC = ()=>{
    const src = useAppSelector(state=>state.user.avatar)
    return (
        <>
            <div className="w-[100%] flex items-center h-[23%] ">
                <div className="flex h-[200px] w-[190px] items-center justify-around">
                    <Avatar src={src} className="scale-[4]"/> 
                </div>
                <div className="flex flex-col">
                    <div className="mt-[20px] mb-[10px]">
                        <div className="text-lg">
                            username
                        </div>
                        <div className="flex flex-grow-[1]"/>
                    </div>
                    <div className="text-lg flex mt-[10px] mb-[10px]">
                        <div className="mr-[15px]">关注:1</div>
                        <div className="mr-[15px]">粉丝:3</div>
                        <div className="mr-[15px]">获赞:0</div>
                        <div className="flex flex-grow-[1]"/>
                    </div>
                    <div className="text-lg flex mt-[10px] mb-[20px]">
                        <div className="mr-[15px]">抖音号:tiktokUser123</div>
                        <div className="mr-[15px]">18岁</div>
                        <div className="mr-[15px]">浙江·杭州</div>
                        <div className="mr-[15px]">杭州电子科技大学</div>
                        <div className="flex flex-grow-[1]"/>
                    </div>

                </div>
            </div>
            <Divider />
            <Segmented
                options={[
                    {
                        label: (
                            <div style={{ padding: 10, width:'80px' }}>
                            <div>作品</div>
                            </div>
                        ),
                        value: '1',
                    },
                    {
                        label: (
                            <div style={{ padding: 10, width:'80px' }}>
                            <div>喜欢</div>
                            </div>
                        ),
                        value: '2',
                    },
                    {
                        label: (
                            <div style={{ padding: 10, width:'80px' }}>
                            <div>收藏</div>
                            </div>
                        ),
                        value: '3',
                    },
                    {
                        label: (
                        <div style={{ padding: 10, width:'80px'}}>
                            <div>观看历史</div>
                        </div>
                        ),
                        value: '4',
                    },
                ]}
            />
            <Divider />
            <div>
                videos
            </div>
        </>
    )
}

export default Mine