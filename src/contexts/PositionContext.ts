import React from 'react'
export type PositionContextValue = {
    isFullWidth:boolean
    helperImageSrc?:string | null
    updateVideoSize:(opts:{videoWidth:number, videoHeight:number})=>void
}

const PositionContext = React.createContext<PositionContextValue>({
    isFullWidth:false,
    updateVideoSize(){},
})
PositionContext.displayName = 'PositionContext'

export default PositionContext