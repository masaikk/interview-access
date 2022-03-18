// let primes=new Set([2,3,5,7]);
// console.log(primes.has(2)); //true
// console.log(primes.has(5)); //true
// console.log(primes.has('5')); //false
//
// console.log(...primes); // 2 3 5 7

let s = new Set([1, 2, 3, 4]);
let t = new Set([1, s]);
console.log(t);//Set(2) { 1, Set(4) { 1, 2, 3, 4 } }
