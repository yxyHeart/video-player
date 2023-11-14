import React from 'react'
import logo from '/logo.svg'
const Logo:React.FC = ()=>{
    const src = new URL(logo, import.meta.url).href
    return (
        <div className='w-[45px] h-[45px]'>
            <img src={src} alt="" />
        </div>
        
    )
}

export default Logo