import React, { useEffect, useRef, useState } from "react";
import avatar from '/avatar.png'
import { Avatar } from "antd";

import UserInfoCard from "./UserInfoCard";
import sleep from "@/utils/sleep";
import { useAppSelector } from "@/hooks/useRedux";

const MyAvatar:React.FC = ()=>{
    // const src = new URL(avatar, import.meta.url).href
    const src = useAppSelector(state=>state.user.avatar)

    

    const cardRef:React.Ref<HTMLDivElement> | undefined = useRef<HTMLDivElement>(null)
    const buttonRef:React.Ref<HTMLElement> | undefined = useRef<HTMLElement>(null)
    const isMouseOnCard = useRef<boolean>(false)
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
            <div className="flex h-[36px] w-[36px]">
                <Avatar src={src} ref={buttonRef}/> 
                
            </div>
            <UserInfoCard ref={cardRef} />
        </>
        
         
    )
}

export default MyAvatar