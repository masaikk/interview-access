let m = new Map();
ob = {};
m.set({}, 1);
m.set({}, 2);
m.set(ob, 3);
console.log(m.size);//3
console.log(m.get({}));//undefined
console.log(m.get(ob));//3

console.log([...m.entries()])
