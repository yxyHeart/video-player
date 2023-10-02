import debounce from 'lodash/debounce'

const listenResizeNative = (
    target:HTMLElement,
    callback:(rect:DOMRectReadOnly)=>void
)=>{
    const observer = new ResizeObserver((changes)=>{
        callback(changes[0].contentRect)
    })
    observer.observe(target)
    return ()=>{
        observer.disconnect()
    }
}

const listenResizePolyfill = (
    target:HTMLElement,
    callback:(rect:DOMRectReadOnly)=>void
)=>{
    const MutationObserver = 
        window.MutationObserver || (window as any).WebKitMutationObserver
    let lastRect:DOMRectReadOnly
    const handler = ()=>{
        const rect = target.getBoundingClientRect()
        const keys:(keyof DOMRectReadOnly)[] = ['left', 'right', 'width', 'height']
        const isChanged = !(lastRect && keys.every((k) => lastRect[k] === rect[k]))
        if(isChanged){
            lastRect = rect as DOMRectReadOnly
            callback(rect)
        }
    }
    const debounceHandler = debounce(handler, 100)
    const observer = new MutationObserver(debounceHandler)
    observer.observe(target, {
        attributes:true,
        characterData:true,
        childList:true,
        subtree:true
    })
    handler()
    window.addEventListener('resize', handler)
    return ()=>{
        observer.disconnect()
        window.removeEventListener('resize',handler)
    }

}

const lintenResize = 
    typeof ResizeObserver === 'function'
    ?listenResizeNative
    :listenResizePolyfill

export default lintenResize