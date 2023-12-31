import React from 'react'
import * as icons from '../icons/controller'
import ControllerButton from './ControllerButton'
import ControllerTooltip from './ControllerTooltip'

const PipButtonitem:React.FC<{
    isPip:boolean
    onClick:React.HTMLAttributes<HTMLButtonElement>['onClick']
}> = ({isPip, onClick})=>{
    return (
        <ControllerTooltip
            localeKey={isPip ? 'action-exit-pip' : 'action-enter-pip'}
            hotkey='p'
        >
            <ControllerButton 
                icon={isPip ? icons.exitPip : icons.pip}
                onClick={onClick}
            />

        </ControllerTooltip>
    )
}

export default PipButtonitem