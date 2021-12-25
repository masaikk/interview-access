







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

如果把x设置成undefined，

!== undefined 为 ture。

但是"y" in o 输出为false。



可以使用for 和 in 循环来判断一个对象的属性情况。

但是使用这种循环不会出现继承的属性。

```javascript
let o={
    x:1,
    y:2,
    z:3
};
console.log(o.propertyIsEnumerable("toString")); //显示false，因为这个属性不可枚举，也不是自有属性
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

可以在对象的中括号里面加入字符串来当做动态的加入对象的成员，如下：

```javascript
const PROPERTY_NAME = 'p1';

function computerPropertyName() {
    return "p" + 2;
}

let p={
    [PROPERTY_NAME]:1,
    [computerPropertyName()]:2
}

console.log(p.p1+p.p2);
```

在对象的继承{}当中使用拓展的字符...是不会的继承到父对象的继承属性的。并且后面参数的同名属性会覆盖掉前面对象参数的同名属性。

覆盖的例子是：

```javascript
let o = {x: 1};
let p = {x: 0, ...o};
console.log(p.x); //1
let q = {...o, x: 2};
console.log(q.x); //2
```

不会继承父对象的继承属性的例子是：

```javas
let o = Object.create({x: 1}) // x为o对象的一个继承属性
let p = {...o};
console.log(p.x); // undefined
```



对象的setter，getter方法 $\bigstar$

```javascript
const serialnum = {
    _n: 0,
    get next() {
        return this._n++;
    },
    set next(n) {
        if (n > this._n)
            this._n = n;
    }
}

serialnum.next = 10;
console.log(serialnum.next); //10
console.log(serialnum.next); //11
console.log(serialnum); //{ _n: 12, next: [Getter/Setter] }
```



## 第七章 数组

数组的特性：

+ 数组实质上也是对象
+ 最大的索引值是 $2^{32}-1$
+ 数组从Array.prototype继承属性
+ 定型数组 11.2

---

数组的迭代器方法$\bigstar$

+ forEach():

  **传三个参数：数组元素的值，数组元素索引，数组本身**

  例如，递增每个元素的值：

  ```javas
  let data = [1, 2, 3, 4, 5]
  data.forEach(function (v, i, a) {
      a[i] = v + 1;
  })
  console.log(data);//[ 2, 3, 4, 5, 6 ]
  ```

+ map()：

​		对于每个元素来说，都会调用传入的函数，并且将函数的返回值当做新的数组的元素。**注意这个函数需要有返回值。**如果数组是稀疏的，那么缺省的元素不会调用这个函数。

```javascript
let data = [1, 2, 3, 4, 5];

console.log(data.map(x => x * x));//[1, 4, 9, 16, 25]
```

+ filter():

返回一个数组的，而且这个数组一定是稠密的，对于每个元素都是属于原数组的。传入的参数是一个返回布尔类型的函数。

同时，可以清除undefined和null的元素。

```javascript
let data = [1, 2, 3, 4, 5, null, undefined]

console.log(data.filter(x => x < 2));//[ 1, null ]
data = data.filter(x => x !== undefined && x !== null);//去除空元素
console.log(data);//[ 1, 2, 3, 4, 5 ]
```

这个作为参数的函数还能有两个变量，一个是值，一个是index

```javascript
let data = [1, 2, 3, 4, 5, null, undefined]
console.log(data.filter((x, i) => i % 2 === 0));//[ 1, 3, 5, undefined ]
```

+ find() & findIndex():

与filter()类似，传入一个函数作为变量。但是不同之处在于这两个函数是迭代到第一个ture的元素就会停止。而且这两个函数之间的不同是在于一个是迭代元素，一个是迭代坐标的，传入的作为变量的函数的自变量分别是元素和坐标。

+ reduce():

*待续*P155

---

使用flat()打平数组

```javascript
let a = [1, [2, [3, [4]]]]
console.log(a.flat(1));//[ 1, 2, [ 3, [ 4 ] ] ]
console.log(a.flat(2));//[ 1, 2, 3, [ 4 ] ]
console.log(a.flat(3));//[ 1, 2, 3, 4 ]
console.log(a.flat(4));//[ 1, 2, 3, 4 ]
```

使用flat()的变量来指定打平的层数。

---

slice()返回数组切片

传入两个参数，第一个参数为前坐标，第二个参数为后坐标。返回的切片是从前坐标到后坐标-1。如果只传入一个参数，则视为前坐标到数组结束。负数坐标与Python类似，-1表示最后一个元素。

```javascript
let a = [1, 2, 3, 4, 5];
console.log(a.slice(0, 3));//[1, 2, 3]
console.log(a.slice(3));//[4, 5]
console.log(a.slice(1, -1));//[2, 3, 4]
```

splice()

fill()

见P159

---

数组索引的方法

indexOf()表示从前往后找数组的某个元素，找到了就返回坐标值，没有找到就返回-1。

lastIndexOf()表示从后往前找。



sort()方法，默认字典序排列数组。

---

## 第八章 函数

函数表达式可以定义完立即执行

```	javascript
let squared = (function (x) {
    return x * x;
}(10))
console.log(squared)
//100
```

确定是否是严格模式

```javascript
const strict = (function () {
    return !this;
}());
```

在ES2020中，在函数表达式的后面，括号前插入?，从而只在函数不是null和undefined时调用函数。

```javascript
f?.(x)
//相当于
(f !== null && f !== undefined) ? f(x) : undefined
```

对于非严格模式下的函数（不是箭头函数）调用，调用上下文（this）是全局对象。在严格模式下，调用上下文是undefined。

---

**this指针$\bigstar\bigstar\bigstar$**

除了箭头函数，嵌套函数不会继承包含函数的this值。

如果嵌套函数（不是箭头函数）被当作函数来调用，则它的this值要么是全局对象（非严格模式），要么是undefined（严格模式）。

```javascript
let o = {
    m: function () {
        let self = this;
        this === o;  // true
        f();

        function f() {
            this === o; // false , this 是 undefined
            self === o; // true
        }
    }
};
o.m();
```

注意在嵌套函数f()的内部，this并不等于对象o，这个问题可以通过在函数之外把一个值定为this来解决。

另外两个解决办法：

+ 将这里的f()改为箭头函数
+ 使用bind()方法

```javascript
let o = {
    m: function () {
        let self = this;
        this === o;  // true
        f();

        const f = () => {
            this === o; // true
        }
    }
};
o.m();


let o = {
    m: function () {
        let self = this;
        this === o;  // true
        f();

        const f = (function () {
            this === o; // ture
        }).bind(this)
    }
};
o.m();
```







