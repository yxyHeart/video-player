const a = 5; //  00000000000000000000000000000101
const b = 2; //  00000000000000000000000000000010
const c = -5; //  11111111111111111111111111111011
import bin from 'js-binary';
console.log(a >>> b); //  00000000000000000000000000000001
// Expected output: 1

console.log(c >>> b); //  00111111111111111111111111111110
// Expected output: 1073741822

console.log(bin(c>>b))