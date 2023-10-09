export default <T extends Array<any>>(arr: T) =>{
    return arr.slice().reverse() as T
}