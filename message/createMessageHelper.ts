
import {ACTIONS, ActionParamsMap} from './constants/actions'
import {EVENTS, EventParamsMap} from './constants/events'

const LIB_ID = 'griffith'

// 消息载体，真实传递给播放器
type MessagePayload = {
  name: ACTIONS & EVENTS
  data?: unknown
}

type Message = {
  from:string
  id:string|number
  payload:MessagePayload
}

type Unsubscribe = {
  unsubscribe:()=>void
}

function createMessageHelper(
  id?:Message['id'],
  targetOrigin = '*',
  shouldValidateId = false
){
  const disposers = new Set<Unsubscribe>()
  function subscribeMessage<E extends keyof EventParamsMap>(
    name:E,
    handler:(
      //Parameters<Type>从函数类型Type里面提取参数类型，组成一个元组返回。
      data:Parameters<EventParamsMap[E]>[0],
      source: MessageEventSource | null
    )=>void
  ):Unsubscribe

  function subscribeMessage(
    handler:(
      name:EVENTS,
      data:unknown,
      source:MessageEventSource | null
    )=>void
  ):Unsubscribe

  function subscribeMessage(arg1:unknown, arg2?:unknown){
    // isLegacy 为 True 说明没有传 eventName，直接传了handler
    // isLegacy 为 False 说明传了eventName， 第二个参数为handler
    const isLegacy = typeof arg1 === 'function'
    const handler = isLegacy ? arg1 : arg2
    const eventName = isLegacy ? undefined : arg1
    function realHandler(event:MessageEvent<Message>){
      const origin = event.origin
      const originIsValidated = targetOrigin === '*' || targetOrigin === origin
      const {from,id:incomingId,payload} = event.data || {}
      const idIsValidated = !shouldValidateId || id === incomingId
      if(originIsValidated && from === LIB_ID && idIsValidated && payload){
        const {name,data} = payload
        if(!name || typeof handler !== 'function'){
          return 
        }
        if(isLegacy){
          handler(name,data as any, event.source)
        }else if(eventName === name){
          handler(data as any,event.source)
        }
      }
    }
    window.addEventListener('message',realHandler)
    const disposer = {
      unsubscribe:()=>{
        window.removeEventListener('message',realHandler)
        disposers.delete(disposer)
      }
    }
    disposers.add(disposer)
    return disposer

  }
  //Dispose all registered event listeners.
  const dispose = ()=>{
    disposers.forEach((x)=>{
      x.unsubscribe()
    })
  }

  //Dispatch action to player
  const dispatchMessage = <T extends keyof ActionParamsMap>(
    target:Window,
    name:T,
    ...data:Parameters<ActionParamsMap[T]>
  )=>{
    target?.postMessage?.(
      {from:LIB_ID,id,payload:{name,data:data[0]}}
    )
  }
  return {
    subscribeMessage,
    dispatchMessage,
    dispose
  }

}

export default createMessageHelper