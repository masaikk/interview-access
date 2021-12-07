// console.log(Object.prototype);


let o = {
    x: 1,
    y: 2,
    z: 3
};
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


let target = {x: 1};
let source = {
    y: 2,
    z: 3
}
for (let key of Object.keys(source)) {
    target[key] = source[key];
}
console.log(target);
