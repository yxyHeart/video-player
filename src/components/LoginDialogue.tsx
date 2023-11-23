import { Modal, QRCode, Segmented } from "antd";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import LoginWithUsernamePassword from "./LoginWithUsernamePassword";

type PropsType = {
    open:boolean,
    setOpen:Dispatch<SetStateAction<boolean>>
}

const LoginDialogue:React.FC<PropsType> = (props)=>{
    // const [open, setOpen] = useState(false);
    const {open, setOpen} = props
    const loginMethod = useRef<number>(3)
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    return (
        <Modal
        title="Title"
        open={open}
        okButtonProps={{ className:"hidden" }}
        cancelButtonProps={{ className:"hidden" }}
        onCancel={handleCancel}
        
    >   
        <div className='flex flex-col items-center content-between'>
            <Segmented
                onChange={(value)=>{loginMethod.current = Number(value)}}
                defaultValue={String(loginMethod.current)}
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
                {loginMethod.current===1 && <QRCode value={'https://ant.design/' || '-'} />}
                {loginMethod.current===2 && <LoginWithUsernamePassword />}
                {loginMethod.current===3 && <LoginWithUsernamePassword />}
            </div>
        </div>
    </Modal>
    )
}

export default LoginDialogue