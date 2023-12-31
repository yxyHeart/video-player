import Stream from '../stream'

export default function ftyp(buffer:any){
    const stream = new Stream(buffer)
    const majorBrand = stream.readType()
    const minorVersion = stream.readByte(4)
    const compatibleBrands = []

    for(let i = stream.position;i<buffer.length;i+=4){
        compatibleBrands.push(stream.readByte(4))
    }

    const ftypBox = {
        majorBrand,
        minorVersion,
        compatibleBrands,
    }

    return ftypBox
}
