import type {
    EVENTS,
    ActionParamsMap,
    EventParamsMap,
} from 'message/src'
import {
    createMessageHelper,
} from 'message/src'
import useHandler from '@/hooks/useHandler'
import React, {useLayoutEffect, useRef} from 'react'
import EventEmitter from 'eventemitter3'


const EVENT_TYPE = 'event'
const ACTION_TYPE = 'action'

export interface Subscription{
    unsubscribe:()=>void
}

export interface MessageContextValue {     
    subscribeEvent:<T extends keyof EventParamsMap>(
        eventName:T,
        handler:EventParamsMap[T]
    )=>Subscription
    dispatchAtion:<T extends keyof ActionParamsMap>(
        actionName:T,
        ...data:Parameters<ActionParamsMap[T]>
    )=>void
}

export interface InternalMessageContextValue{
    emitEvent<T extends keyof EventParamsMap>(
        this:void,
        eventName:T,
        ...data:Parameters<EventParamsMap[T]>
    ):void
    subscribeAction<T extends keyof ActionParamsMap>(
        this:void,
        actionName:T,
        listener:ActionParamsMap[T]
    ):Subscription
}

// 用于播放器内部，只能接收外界传入的 Action，向外界发出 Event
export const InternalMessageContext =
    React.createContext<InternalMessageContextValue>({} as any)
InternalMessageContext.displayName = 'InternalMessageContext'

// 用于播放器外部，只能接收播放器发出的 Event, 或者向播放器发送 Action
export const MessageContext = 
    React.createContext<MessageContextValue>(null as any)
MessageContext.displayName = 'MessageContext'

type MessageContextRef = React.MutableRefObject<MessageContextValue | void>

type MessageProviderProps = {
    id:string
    targetOrigin:string
    enableCrossWindow?:boolean
    onEvent?:(name:EVENTS, data?:unknown)=>void
    dispatchRef?:React.MutableRefObject<MessageContextValue['dispatchAtion'] | void>
    messageContextRef?:MessageContextRef
}

type MessageHelper = ReturnType<typeof createMessageHelper>

export const useMessageContextRef = () =>{
    const extra = {
        useEvent<T extends keyof EventParamsMap>(
            name:T,
            listener:EventParamsMap[T]
        ){
            const handler = useHandler(listener)
            useLayoutEffect(
                ()=>ref.subscribeEvent(name, handler).unsubscribe,
            [name, handler])
        }
    }
    const ref = useRef(extra).current as MessageContextRef & MessageContextValue & typeof extra

    // Player mount 中触发了事件，确保在它之前开始监听
    useLayoutEffect(()=>{
        if(!ref.current){
            throw new Error(
                'Missing ref value, please pass it to Player, eg. `<Player messageContextRef={messageContextRef} />`'
            )
        }
        Object.assign(ref,ref.current)
    },[ref])

    return ref

}

export class MessageProvider extends React.PureComponent<MessageProviderProps>{
    static defaultProps = {
        targetOrigin:'*'
    }
    emitter:EventEmitter
    crossWindfowMessager:MessageHelper

    constructor(props:MessageProviderProps){
        super(props)
        this.emitter = new EventEmitter()
        const {id, targetOrigin} = this.props
        this.crossWindfowMessager = createMessageHelper(id, targetOrigin)

        if(this.props.dispatchRef){
            this.props.dispatchRef.current = this.externalContextValue.dispatchAction
        }
    }
    componentDidMount(): void {
        if(this.props.enableCrossWindow){
            this.crossWindfowMessager.subscribeMessage((name,data)=>{
                this.dispatchAction(name as any, data as any)
            })
        }
    }

    componentWillUnmount(): void {
        if(this.props.dispatchRef){
            this.props.dispatchRef.current = undefined
        }
        if(this.props.messageContextRef){
            this.props.messageContextRef.current = undefined
        }
        this.crossWindfowMessager.dispose()
        this.emitter.removeAllListeners()
    }

    emitEvent:InternalMessageContextValue['emitEvent'] = (eventName, data?) =>{
        this.emitter.emit(eventName,{__type__:EVENT_TYPE,data})
        this.props.onEvent?.(eventName,data)
        if(this.props.enableCrossWindow){
            this.crossWindfowMessager.dispatchMessage(
                window.parent,
                eventName as any,
                data as any
            )
        }
    }
    subscribeEvent:MessageContextValue['subscribeEvent'] = (
        eventName,
        listener
    )=>{
        const realListener = ({__type__, data}:any = {})=>{
            if(__type__ === EVENT_TYPE){
                // @ts-expect-error Argument of type 'any' is not assignable to parameter of type 'never'
                listener(data)
            }
        }
        this.emitter.on(eventName, realListener)

        return {
            unsubscribe:()=>this.emitter.off(eventName)
        }
    }

    dispatchAction:MessageContextValue['dispatchAtion'] = (
        actionName,
        data?
    ) =>{
        this.emitter.emit(actionName,{__type__:ACTION_TYPE, data})
    }

    subscribeAction:MessageContextValue['dispatchAtion'] = (
        actionName,
        data?
    )=>{
        this.emitter.emit(actionName,{__type__:ACTION_TYPE, data})
    }

    internalContextValue = {
        emitEvent:this.emitEvent,
        subscribeAction:this.subscribeAction
    }
    externalContextValue = {
        dispatchAction:this.dispatchAction,
        subscribeEvent:this.subscribeEvent
    }
}


