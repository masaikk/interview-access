let primes=new Set([2,3,5,7]);
console.log(primes.has(2)); //true
console.log(primes.has(5)); //true
console.log(primes.has('5')); //false

console.log(...primes); // 2 3 5 7