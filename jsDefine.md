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

