export default function getBufferedTime(
    currentTime:number,
    buffered:{start:number,end:number}[]
):number{
    const item = buffered.find((item)=>{
        return item.start <= currentTime && item.end >= currentTime
    })
    if(item){
        return item.end
    }
    return 0
}