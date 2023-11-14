import React from 'react'
import * as icons from '../icons/controller'
import ControllerButton from './ControllerButton'
import ControllerTooltip from './ControllerTooltip'

const PageFullScreenButtonItem:React.FC<{
    isFullScreen:boolean
    onClick:React.HTMLAttributes<HTMLButtonElement>['onClick'] | (()=>void)
}> = ({isFullScreen, onClick})=>(
    <ControllerTooltip
        localeKey={
            isFullScreen?'action-enter-page-fullscreen':'action-exit-page-fullscreen'
        }
        hotkey='t'
    >
        <ControllerButton 
            icon={isFullScreen?icons.exitPageScreen:icons.enterPageScreen}
            onClick={onClick}
        />
    </ControllerTooltip>
)

export default PageFullScreenButtonItem