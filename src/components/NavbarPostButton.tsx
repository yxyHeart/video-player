import React, { useEffect, useRef, useState } from "react";
import { NavbarItem } from "@/components/Items/NavbarItem";
import { PlusSquareTwoTone,PlusCircleOutlined } from '@ant-design/icons'
import { Modal } from "antd";
import UploadField from "@/components/UploadField";


const NavbarPostButton:React.FC = ()=>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navbarItemRef = useRef<HTMLDivElement>(null)
    const handleClick = ()=>{
        setIsModalOpen(true)
    }
    useEffect(()=>{
        navbarItemRef.current?.addEventListener('click',handleClick)
        return ()=>{
            navbarItemRef.current?.removeEventListener('click',handleClick)
        }
    },[])
    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    return (
        <>
            <NavbarItem ref={navbarItemRef} icon={<PlusCircleOutlined  className="scale-[1.8]"/>} text={'投稿'} /> 
            <Modal 
                title="Basic Modal" 
                open={isModalOpen} 
                onOk={handleOk} 
                onCancel={handleCancel}
            >
                <UploadField />
            </Modal>
        </>
    )
} 

export default NavbarPostButton