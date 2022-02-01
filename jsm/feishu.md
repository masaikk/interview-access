# 前端面经的飞书笔记

*飞书文档链接[Docs (feishu.cn)前端](https://bytedance.feishu.cn/base/app8Ok6k9qafpMkgyRbfgxeEnet?table=tblEnSV2PNAajtWE&view=vewJHSwJVd)*

主要记录该文档的前端基础，框架，以及Node部分。Vue部分可以参考vue3的网课和官方文档（感觉主要内容在于vue3的迁移部分[はじめに | Vue.js (vuejs.org)](https://v3.ja.vuejs.org/guide/migration/introduction.html)）。

有时候，看到别人的好的项目就会懊恼，感叹自己水平低下。我在这里放下两个参考范例：[VOICEVOX/voicevox: 無料で使える中品質なテキスト読み上げソフトウェア、VOICEVOXのエディター (github.com)](https://github.com/VOICEVOX/voicevox)和[MakinoharaShoko/WebGAL: 全新的基于 Web 的 视觉小说引擎 | A brand new Visual Novel engine based on Web. (github.com)](https://github.com/MakinoharaShoko/WebGAL)

---

## 前端基础

### 原型链

[JavaScript深入之从原型到原型链 · Issue #2 · mqyqingfeng/Blog (github.com)](https://github.com/mqyqingfeng/Blog/issues/2)

感觉是ES5重点，在JS权威指南的笔记中有写到prototype。

别人的示例代码如下

```javascript
function Person() {

}
// 虽然写在注释里，但是你要注意：
// prototype是函数才会有的属性
Person.prototype.name = 'Kevin';
var person1 = new Person();
var person2 = new Person();
console.log(person1.name) // Kevin
console.log(person2.name) // Kevin
```

类的prototype也是一个对象。

**每一个JavaScript对象(除了 null )都具有的一个属性，叫\_\_proto\_\_，这个属性会指向该对象的原型。**

![image-20220131235216240](feishu.assets/image-20220131235216240.png)

**每个原型都有一个 constructor 属性指向关联的构造函数。**

![image-20220131235314446](feishu.assets/image-20220131235314446.png)

```javascript
function Person() {

}

var person = new Person();

console.log(person.__proto__ == Person.prototype) // true
console.log(Person.prototype.constructor == Person) // true
// 顺便学习一个ES5的方法,可以获得对象的原型
console.log(Object.getPrototypeOf(person) === Person.prototype) // true
```

而对于对象Object的prototype指向的那个对象，是没有\_\_proto\_\_属性的。

并且，对于constructor来说，设置以下的例子

```javascript
function Person() {

}
var person = new Person();
console.log(person.constructor === Person); // true
```

当获取 person.constructor 时，其实 person 中并没有 constructor 属性,当不能读取到constructor 属性时，会从 person 的原型也就是 Person.prototype 中读取，正好原型中有该属性，所以：

```javascript
person.constructor === Person.prototype.constructor
```

![image-20220131235802965](feishu.assets/image-20220131235802965.png)



---

### 继承

[JavaScript深入之继承的多种方式和优缺点 · Issue #16 · mqyqingfeng/Blog (github.com)](https://github.com/mqyqingfeng/Blog/issues/16)

*感觉这里是ES5留下的糟粕，还应该关注一下webpack babel转义ES6之后具体用的哪种方式。*

继承分为原型链继承，经典（使用构造函数）继承，组合继承，原型式继承，寄生式继承，寄生组合式继承六种。下面将讨论优缺点

原型链继承为：

```javascript
function Parent () {
    this.name = 'kevin';
}

Parent.prototype.getName = function () {
    console.log(this.name);
}

function Child () {

}

Child.prototype = new Parent();

var child1 = new Child();

console.log(child1.getName()) // kevin
```

这里带来了两个缺点：

+ 父对象的属性对于每个子对象来说都是共用的（相当于静态属性）。
+ 在创建 Child 的实例时，不能向Parent传参。

以下是使用构造函数继承的方法

```javascript
function Parent () {
    this.names = ['kevin', 'daisy'];
}

function Child () {
    Parent.call(this);
}

var child1 = new Child();

child1.names.push('yayu');

console.log(child1.names); // ["kevin", "daisy", "yayu"]

var child2 = new Child();

console.log(child2.names); // ["kevin", "daisy"]
```

这里的优点在于父对象的每个属性在不同的子对象里面有各自的。并且也可以向父对象传参了。

```javascript
function Parent (name) {
    this.name = name;
}

function Child (name) {
    Parent.call(this, name);
}

var child1 = new Child('kevin');

console.log(child1.name); // kevin

var child2 = new Child('daisy');

console.log(child2.name); // daisy
```

*这里的call()方法观看之前js权威指南的笔记。*

这种继承方法的缺点是，方法都在构造函数中定义，每次创建实例都会创建一遍方法。
