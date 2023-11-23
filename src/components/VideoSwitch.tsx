import React from "react";
import { Button } from "antd";
import { UpOutlined, DownOutlined, MailOutlined} from '@ant-design/icons'

type PropsType = {
    curSourceIndex:number
    setCurSourceIndex:React.Dispatch<React.SetStateAction<number>>
}

const VideoSwitch:React.FC<PropsType> = (props)=>{
    const { curSourceIndex, setCurSourceIndex } = props
    const handleClickUp = ()=>{
        setCurSourceIndex(curSourceIndex-1)
    }
    const handleClickDown = ()=>{
        setCurSourceIndex(curSourceIndex+1)
    }
    return (
        <div className="flex flex-col">
            <Button 
                type="primary" 
                shape="round" 
                icon={<UpOutlined />}  
                size="large" 
                onClick={handleClickUp}
            >
            </Button>
            <Button 
                type="primary" 
                shape="round" 
                icon={<DownOutlined />} 
                size="large"
                onClick={handleClickDown}     
            >
            </Button>
        </div>

    )
}
export default VideoSwitch