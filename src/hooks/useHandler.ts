import { useRef } from 'react'

const useHandler = <T extends (...args:any[])=>any>(handler:T)=>{
    const handlerRef = useRef<T>(handler)
    handlerRef.current = handler

    return useRef(((...args:any[])=>handlerRef.current(...args)) as T).current
}

export default useHandler