import { isHlsNativeSupported, isMSESupported } from "heart-utils";
import HeartHls from 'heart-hls'
// import HeartMp4 from 'heart-mp4'
import NormalVideo from "./NormalVideo";
import memoize from 'lodash/memoize'

function selectVideo(format:any, useMSE:any){
    if(
        format === 'm3u8' &&
        HeartHls?.VideoComponent &&
        isMSESupported() &&
        !isHlsNativeSupported()
    ){
        return HeartHls
    }

    // mp4过于复杂，还没写好
    
    return NormalVideo
}

export default memoize(selectVideo, (...args)=>String(args))