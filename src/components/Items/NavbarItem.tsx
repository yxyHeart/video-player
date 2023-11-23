import React, { forwardRef } from "react";

type PropsType = {
    icon:React.ReactNode,
    text:string
}

export const NavbarItem = React.forwardRef<HTMLDivElement,PropsType>((props,ref)=>{
    const {icon, text} = props
    return (
        <>
            <div ref={ref} className='flex flex-col items-center content-between mt-[10px]'>
                {icon}
                <div className='leading-10'>{text}</div>
            </div>
        </>
    )
})