import {Quality, FormattedPlaySource, PlaySourceMap} from '@/types'
const QUALITY_ORDER:Quality[] = ['auto', 'ld', 'sd', 'hd', 'fhd']

export const getQualities = (
    sources: PlaySourceMap,
    isMobile:any,
    isDescOrder:boolean
)=>{
    const qualities = (Object.keys(sources) as Quality[]).sort((a,b)=>(
        isDescOrder
        ? QUALITY_ORDER.indexOf(b) - QUALITY_ORDER.indexOf(a)
        : QUALITY_ORDER.indexOf(a) - QUALITY_ORDER.indexOf(b)
    ))
    if(qualities.length > 1){
        if(isMobile){
            return qualities.slice(0,1)
        }else{
            return qualities.filter((item)=>item!== 'ld')
        }
    }
    return qualities
}

export const getSources = (
    qualities: Quality [],
    sources: PlaySourceMap
):FormattedPlaySource [] =>{
    return (
        qualities.map((quality)=>{
            // @ts-expect-error Property 'auto' does not exist on type 'PlaySourceMap'，应当是 QUALITY_ORDER 定义错了, 可能 auto 并不是一个真实的画质？
            const {play_url,...rest} = sources[quality]
            return {
                ...rest,
                source:play_url,
                quality,
            } as FormattedPlaySource
        })
    )
}