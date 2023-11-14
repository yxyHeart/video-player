import cloneDeep from 'lodash/cloneDeep'
import findBox from './findBox'
import getPerChunkArray from './getPerChunkArray'

export default function getBufferStart(
    mp4BoxTree:any,
    videoOffsetStart = 0,
    audioOffsetStart = 0
){
    return Math.min(
        getChunkSize(mp4BoxTree, videoOffsetStart, 'video'),
        getChunkSize(mp4BoxTree, audioOffsetStart, 'audio')
    )
}

function getChunkSize(mp4BoxTree:any, offsetStart:number, type:string){
    const stscBox = cloneDeep(
        findBox(mp4BoxTree, type === 'video' ? 'videoStsc' : 'audioStsc')
    )
    let newOffsetStart = 0
    const stscBoxSamplesPerChunkArray = getPerChunkArray(stscBox, offsetStart)
    let chunkIndex = 0
    for(
        let i=0;
        offsetStart > 0 && 1<=stscBoxSamplesPerChunkArray.length;
        i++
    ){
        newOffsetStart += stscBoxSamplesPerChunkArray[i]
        if(newOffsetStart === offsetStart){
            chunkIndex = i+1
            break
        }else if( newOffsetStart > offsetStart){
            newOffsetStart -= stscBoxSamplesPerChunkArray[i]
            chunkIndex = i
            break
        }
    }
    const sampleInterval = [newOffsetStart, offsetStart]

    const stszBox = findBox(
        mp4BoxTree,
        type === 'video'? 'videoStsz' : 'audioStsz'
    )
    let sampleSize = 0
    // 考虑到 stsc 不为 1 的情况
    const samples = stszBox.samples.slice(sampleInterval[0], sampleInterval[1])
    for(let i = 0; i<samples.length;i++){
        sampleSize += samples[i].entrySize
    }
    
}