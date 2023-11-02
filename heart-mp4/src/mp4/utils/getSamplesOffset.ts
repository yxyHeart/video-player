import { TypeBoxMap } from "./findBox";

export default function getSamplesOffset(
    stszBox: ReturnType<TypeBoxMap['videoStsz']>,
    stscBoxSamplesPerChunkArray: number[]
){
    const sampleOffset:number[] = []
    for(let i =0,j = 0;i<stscBoxSamplesPerChunkArray.length;i++){
        if(i+j >= stszBox.samples.length){
            break
        }

        sampleOffset.push(stszBox.samples[i+j].entrySize)
        if(stscBoxSamplesPerChunkArray[i] !== 1){
            for(let flag = 1;flag < stscBoxSamplesPerChunkArray[i];flag++){
                const offect = 
                    stszBox.samples[i + flag + j].entrySize +
                    sampleOffset[i + flag - 1 + j]
                sampleOffset.push(offect)
            }
            j = j + stscBoxSamplesPerChunkArray[i] - 1 

        }
    }

    return sampleOffset
}