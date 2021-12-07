







# JavaScript权威指南

---

## 第六章 **对象**

防止某个对象被第三方库意外修改，建议使用Object.create()方法 $\bigstar$

```javascript
let o={foo:'bar'};
library.func(Object.create(o))
```

解释Object.create()

```javascript
let o1=Object.create(null);
// 这里o1没有任何对象属性

let o2=Object.create(Object.prototype)
//创建一个空对象，类似于{}, new Object()
```

判断一个对象是否含有某个属性

```javascript
let o = {x:1};
"x" in o; //ture
"toString" in o; //ture

o.hasOwnProperty("x"); // ture
o.hasOwnProperty("toString"); // false 因为·这个是继承的属性。
```

如果把x设置成undefined

!== undefined 为 ture

但是"y" in o 输出为false



可以使用for 和 in 循环来判断一个对象的属性情况。

但是使用这种循环不会出现继承的属性。

```javascript
let o={
    x:1,
    y:2,
    z:3
};
console.log(o.propertyIsEnumerable("toString")); //显示false，因为这个属性不可枚举，也不是自由属性
console.log('---');
for (let p in o){
    console.log(p);
}
```



```javascript
let o={
    x:1,
    y:2,
    z:3
};

for (let p in o) {
    if (!o.hasOwnProperty(p))
        continue //跳过继承属性
}
console.log('---');
for (let p in o) {
    if (typeof o[p] === 'function')
        continue //跳过所有方法
}
```

将一个对象的全部属性给另一个对象

```javascript
let target = {x: 1};
let source = {
    y: 2,
    z: 3
}
for (let key of Object.keys(source)) {
    target[key] = source[key];
}
console.log(target);
```



Object.assign()方法 $\bigstar$

这个方法接受两个及以上的参数。都应该是对象。

p132待续

```javas
o=Object.assign({},defaults,o);
```

首先会把defaults的属性覆盖了{}，之后的o对象的属性覆盖了前面的对象。

```javascript
o = {...defaults,...o}
```

与上述的代码相类似。

```javascript
Object.assign({x: 1}, {x: 2, y: 2}, {y: 3, z: 4})
// { x: 2, y: 3, z: 4 }
```









