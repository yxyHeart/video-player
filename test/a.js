//map.js
const a = [1,2,3]
const f = (...args)=>{
  return (...args.map(item=>item))
}
console.log(f(...a))
