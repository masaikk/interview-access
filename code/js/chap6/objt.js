// console.log(Object.prototype);


// let o = {
//     x: 1,
//     y: 2,
//     z: 3
// };
// console.log(o.propertyIsEnumerable("toString"));
// console.log('---');
// for (let p in o){
//     console.log(p);
// }
// for (let p in o) {
//     if (!o.hasOwnProperty(p))
//         continue
//     console.log(p);
// }
// console.log('---');
// for (let p in o) {
//     if (typeof o[p] === 'function')
//         continue
//     console.log(p);
// }


// let target = {x: 1};
// let source = {
//     y: 2,
//     z: 3
// }
// for (let key of Object.keys(source)) {
//     target[key] = source[key];
// }
// console.log(target);


// console.log(Object.assign({x: 1}, {x: 2, y: 2}, {y: 3, z: 4}));


// const PROPERTY_NAME = 'p1';
//
// function computerPropertyName() {
//     return "p" + 2;
// }
//
// let p={
//     [PROPERTY_NAME]:1,
//     [computerPropertyName()]:2
// }
//
// console.log(p.p1+p.p2);


// const serialnum = {
//     _n: 0,
//     get next() {
//         return this._n++;
//     },
//     set next(n) {
//         if (n > this._n)
//             this._n = n;
//     }
// }
//
// serialnum.next = 10;
// console.log(serialnum.next); //10
// console.log(serialnum.next); //11
// console.log(serialnum); //{ _n: 12, next: [Getter/Setter] }


// let o = {x: 1};
// let p = {x: 0, ...o};
// console.log(p.x); //1
// let q = {...o, x: 2};
// console.log(q.x); //2


let o = Object.create({x: 1}) // x为o对象的一个继承属性
let p = {...o};
console.log(p.x);// undefined
