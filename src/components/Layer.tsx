import React, {useContext} from 'react'
import {css} from 'aphrodite/no-important'
import PositionContext from '@/contexts/PositionContext'
import ObjectFitContext from '@/contexts/ObjectFitContext'
import styles from './Layer.styles'

const getContainerClassName = (isFullWidth:boolean) =>{
    return css(
        styles.container,
        isFullWidth ? styles.containerFullWidth : styles.containerFullHeight
    )
}

const getImageClassName = (isFullWidth:boolean)=>{
    return css(
        styles.image,
        isFullWidth ? styles.imageFullWidth : styles.imageFullHeight
    )
}

const Positioned:React.FC = ({children}) =>{
    const { isFullWidth, helperImageSrc } = useContext(PositionContext)

    if(helperImageSrc){
        return (
            <div className={getContainerClassName(isFullWidth)}>
                <img src={helperImageSrc} className={getImageClassName(isFullWidth)} />
                {children}
                
            </div>
        )
    }

    return null
}

const Layer:React.FC = ({children})=>{
    const { objectFit} = useContext(ObjectFitContext)
    if(children){
        const layer = <div className={css(styles.layer)}>{children}</div>
        return objectFit === 'cover' ? layer : <Positioned>{layer}</Positioned>
    }
}

export default Layer