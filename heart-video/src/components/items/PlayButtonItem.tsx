import React from 'react'
import * as icons from '../icons/controller'
import ControllerButton from './ControllerButton'
import ControllerTooltip from './ControllerTooltip'

const PlayButtonItem:React.FC<{
    isPlaying:boolean
    onClick:React.HTMLAttributes<HTMLButtonElement>['onClick']
}> = ({isPlaying, onClick}) =>{
    return (
    <ControllerTooltip localeKey={isPlaying?'pause':'play'} hotkey='k'>
        <ControllerButton
            icon={isPlaying?icons.pause:icons.play}
            onClick={onClick}
        >
        </ControllerButton>
    </ControllerTooltip>
    )
}

export default PlayButtonItem