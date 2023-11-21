import React from "react";
import { Button } from "antd";
import { UpOutlined, DownOutlined, MailOutlined} from '@ant-design/icons'
const VideoSwitch:React.FC = ()=>{

    return (
        <div className="flex flex-col">
            <Button type="primary" shape="round" icon={<UpOutlined />}  size="large"></Button>
            <Button type="primary" shape="round" icon={<DownOutlined />} size="large"></Button>
        </div>

    )
}
export default VideoSwitch