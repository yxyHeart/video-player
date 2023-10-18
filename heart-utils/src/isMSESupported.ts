function getMedisSource(){
    if(typeof window !== 'undefined'){
        return window.MediaSource || (window as any).WebkitMediaSource
    }
}

export default function isMSESupported(){
    const mediaSource = getMedisSource()
    const sourceBuffer = window.SourceBuffer || (window as any).WebkitSourceBuffer
    const isTypeSupported = 
        mediaSource &&
        typeof mediaSource.isTypeSupported === 'function' &&
        mediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"')

    const sourceBufferValidAPI = 
    !sourceBuffer ||
    (sourceBuffer.prototype &&
        typeof sourceBuffer.prototype.appendBuffer === 'function' &&
        typeof sourceBuffer.prototype.remove === 'function')
    return !!isTypeSupported && !!sourceBufferValidAPI
}