// 睡眠 单位：ms
const sleep = (time:number=0) =>{
    return new Promise((res)=>{
        setTimeout(res,time)
    })
}

export default sleep