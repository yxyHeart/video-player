import Stream from '../stream'

export default function stsc(buffer:any){
    const stream = new Stream(buffer)

    const version = stream.readByte(1)
    const flags = stream.readByte(3)

    const entryCount = stream.readByte(4)
    const samples = []

    for(let i =0;i<entryCount;i++){
        samples.push({
            firstChunk:stream.readByte(4),
            samplesPerChunk:stream.readByte(4),
            sampleDescriptionIndex:stream.readByte(4),
        })
    }

    const stscBox = {
        version,
        flags,
        samples,
    }

    return stscBox
}