# 前端面经问题

在此记录面经问题，主要内容为前端。

---

1. iframe的缺点？

   *出自《前端程序员》*

   iframe由如下缺点：

   + iframe会阻塞主页面的onload的事件
   + iframe的元素即使为空，加载也需要时间
   + iframe元素没有语义

2. DOCTYPE和区分严格模式与混杂模式的意义在于？

   *出自《前端程序员》*

   ``<!DOCTYPE>``来表示严格模式。否则是混杂模式。

3. display的各个值有什么意义？

   *出自《前端程序员》*

4. Vue的生命周期函数？试举例。
   
   *出自原创科技技术一面*
   
5. Vue发送网络请求的生命阶段是？

   *出自原创科技技术一面*

   mounted和created两个阶段。

   考虑它们的不同，created阶段更前，在此阶段还未挂载但是能操作``$data``。

6. Vue如何封装未知层数的树型组件？

   *出自原创科技一面*

   使用v-for

7. Vue的父子节点的双向绑定及其意义？

   *出自原创科技一面*

8. JS的深拷贝与浅拷贝的区别与意义？

   *出自原创科技一面*

   *参考Vue3的笔记*

9. 有两个对象数组A和B，A对应着员工ID和员工工资，B对应着员工ID和员工绩效。如何返回一个对象数组，使得对应着员工的ID和员工的工资加绩效？

   *出自原创科技技术一面*

   使用map来记录员工的ID。比set好在能直接对值进行操作。

10. vue中computed和watch的区别？

    *出自寝室扯淡*

    computed中使用了异步的函数也不能用不了。

    如果要使用异步的函数，那么就必须使用watch。

    并且在组件中使用computed的使用，就计算一次渲染多次。

11. 实现深拷贝的方法？

    *出自飞书*

    1. 使用``JSON.parse(JSON.stringify());``但是对于子对象就很难使用了

    2. 使用判断和递归的方法，判断拷贝的对象是否是数组或者Object

       ```javascript
       module.exports = function clone(target) {
           if (typeof target === 'object') {
               let cloneTarget = Array.isArray(target) ? [] : {};
               for (const key in target) {
                   cloneTarget[key] = clone(target[key]);
               }
               return cloneTarget;
           } else {
               return target;
           }
       };
       ```

       但是这样解决不了循环引用的问题，例如如下对象

       ```javascript
       const target = {
           field1: 1,
           field2: undefined,
           field3: {
               child: 'child'
           },
           field4: [2, 4, 8]
       };
       target.target = target;
       ```

    3. 使用map来解决上述问题

       ```javascript
       function clone(target, map = new Map()) {
           if (typeof target === 'object') {
               let cloneTarget = Array.isArray(target) ? [] : {};
               if (map.get(target)) {
                   return target;
               }
               map.set(target, cloneTarget);
               for (const key in target) {
                   cloneTarget[key] = clone(target[key], map);
               }
               return cloneTarget;
           } else {
               return target;
           }
       };
       ```

12. 如何实现add(1)(2)(3)

    *出自飞书*

    考虑函数柯里化：函数柯里化（curry）是函数式编程里面的概念。curry的概念很简单：只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。

    ```javascript
    const add = x => y => z => x + y + z;
    console.log(add(1)(2)(3));
    ```

    但是如果想要实现

    ```javascript
    add(1, 2, 3);
    add(1, 2)(3);
    add(1)(2, 3);
    ```

    这就需要考虑判断参数个数，可以拓展参数

    ```javascript
    const curry = (fn, ...args) => 
        // 函数的参数个数可以直接通过函数数的.length属性来访问
        args.length >= fn.length // 这个判断很关键！！！
        // 传入的参数大于等于原始函数fn的参数个数，则直接执行该函数
        ? fn(...args)
        /**
         * 传入的参数小于原始函数fn的参数个数时
         * 则继续对当前函数进行柯里化，返回一个接受所有参数（当前参数和剩余参数） 的函数
        */
        : (..._args) => curry(fn, ...args, ..._args);
    
    function add1(x, y, z) {
        return x + y + z;
    }
    const add = curry(add1);
    console.log(add(1, 2, 3));
    console.log(add(1)(2)(3));
    console.log(add(1, 2)(3));
    console.log(add(1)(2, 3));
    ```

13. JS实现大数相加

    *出自飞书*

    [JS 实现两个大数相加？ - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/72179476)

14. 实现数组的flat操作

    *出自飞书*

    [面试官连环追问：数组拍平（扁平化） flat 方法实现 - SegmentFault 思否](https://segmentfault.com/a/1190000021366004)

    - **第一个要解决的就是遍历数组的每一个元素；**
    - **第二个要解决的就是判断元素是否是数组；**
    - **第三个要解决的就是将数组的元素展开一层**

15. CSS的引入方式？link与@import的区别？

    *出自《前端程序员》*

    有三种引入方式：

    + 行内式，将样式写在元素的style里面。
    + 内嵌式，将样式写在style元素里面。
    + 外链式，使用link引入。

    link与@import的区别：

    + @import只能加载css
    + 如果使用link，在页面载入的同时就会加载，是同步的。@import加载是等待网页完全载入之后再加载css文件，是异步加载。
    + link没有兼容问题，@import在低版本的浏览器中不支持
    + link是DOM元素，支持使用JavaScript控制DOM和样式，@import不支持。

16. 拍平二维数值？

    使用apply函数

    ```javascript
    function flat(a){
        return Array.prototype.concat.apply([],a)
    }
    ```

17. 拍平多维数组？

    使用递归的，使用``Array.prototype.isArray``方法来判断数组，进行递归

    ```javascript
    Array.prototype.flat2 =function(){
      let reslut=[]
      for(let i=0;i<this.length;i++){
          if(Array.isArray(this[i])){
              reslut=reslut.concat(this[i].flat2())
          }else{
              reslut.push(this[i])
          }
      } 
      return reslut
    }
    let arr=[1,[2,[3,[4],[5],[6]]]]
    arr.flat2()
    ```

    使用生成器迭代法

    ```javascript
        function *flat(arr) {
           for (const item of arr) {
               if (Array.isArray(item)) {
                   yield *flat(item);
               } else {
                   yield item;
               }
           }
       }
       const result = [...flat([1,2,[3,[4]]])]
       console.log(result) //  [1, 2, 3, 4]
    ```

18. 如何实现一个方法，使得它能在一个对象中取值并组成一个新的对象？

    参考only库的代码

    ```javascript
    module.exports = function(obj, keys){
      obj = obj || {};
      if ('string' == typeof keys) keys = keys.split(/ +/);
      return keys.reduce(function(ret, key){
        if (null == obj[key]) return ret;
        ret[key] = obj[key];
        return ret;
      }, {});
    };
    ```

19. 介绍一下计算机网络中的SYN攻击？

    SYN攻击即利用TCP协议缺陷，通过发送大量的半连接请求，占用半连接队列，耗费CPU和内存资源。

    优化方式：

    1. 缩短SYN Timeout时间
    2. 记录IP，若连续受到某个IP的重复SYN报文，从这个IP地址来的包会被一概丢弃。

20. TCP连接中四次挥手是怎么样的？

    1. 第一次挥手：客户端发送一个FIN，用来关闭客户端到服务端的[数据](https://www.nowcoder.com/jump/super-jump/word?word=数据)传送，客户端进入fin_wait_1状态。
    2. 第二次挥手：服务端收到FIN后，发送一个ACK给客户端，确认序号为收到序号+1，服务端进入Close_wait状态。此时TCP连接处于半关闭状态，即客户端已经没有要发送的[数据](https://www.nowcoder.com/jump/super-jump/word?word=数据)了，但服务端若发送[数据](https://www.nowcoder.com/jump/super-jump/word?word=数据)，则客户端仍要接收。
    3. 第三次挥手：服务端发送一个FIN，用来关闭服务端到客户端的[数据](https://www.nowcoder.com/jump/super-jump/word?word=数据)传送，服务端进入Last_ack状态。
    4. 第四次挥手：客户端收到FIN后，客户端进入Time_wait状态，接着发送一个ACK给服务端，确认后，服务端进入Closed状态，完成四次挥手。

    *追问：为什么要确定四次？*

    主要原因是当服务端收到客户端的 FIN [数据](https://www.nowcoder.com/jump/super-jump/word?word=数据)包后，服务端可能还有[数据](https://www.nowcoder.com/jump/super-jump/word?word=数据)没发完，不会立即close。

    所以服务端会先将 ACK 发过去告诉客户端我收到你的断开请求了，但请再给我一点时间，这段时间用来发送剩下的[数据](https://www.nowcoder.com/jump/super-jump/word?word=数据)报文，发完之后再将 FIN 包发给客户端表示现在可以断了。之后客户端需要收到 FIN 包后发送 ACK 确认断开信息给服务端。

21. 解释一下Https连接的过程？

    1. 浏览器将支持的加密[算法](https://www.nowcoder.com/jump/super-jump/word?word=算法)信息发给服务器
    2. 服务器选择一套浏览器支持的加密[算法](https://www.nowcoder.com/jump/super-jump/word?word=算法)，以证书的形式回发给浏览器
    3. 客户端(SSL/TLS)解析证书验证证书合法性，生成对称加密的密钥，我们将该密钥称之为client key，即客户端密钥，用服务器的公钥对客户端密钥进行非对称加密。
    4. 客户端会发起HTTPS中的第二个HTTP请求，将加密之后的客户端对称密钥发送给服务器
    5. 服务器接收到客户端发来的密文之后，会用自己的私钥对其进行非对称解密，解密之后的明文就是客户端密钥，然后用客户端密钥对[数据](https://www.nowcoder.com/jump/super-jump/word?word=数据)进行对称加密，这样[数据](https://www.nowcoder.com/jump/super-jump/word?word=数据)就变成了密文。
    6. 服务器将加密后的密文发送给客户端
    7. 客户端收到服务器发送来的密文，用客户端密钥对其进行对称解密，得到服务器发送的[数据](https://www.nowcoder.com/jump/super-jump/word?word=数据)。这样HTTPS中的第二个HTTP请求结束，整个HTTPS传输完成

22. 谈谈对于vue的keep-alive的理解？

    出自B站视频[链接](https://www.bilibili.com/video/BV1Tu411B7mv/?spm_id_from=333.788&vd_source=36542d6c49bf487d8a18d22be404b8d2)

    首先，这个标签是vue自带的，用于缓存组件。在这个标签里面的组件在第二次以及之后进入之后，只会执行activated生命周期。

    它的用途可以放在对于网络请求数量的减少，减轻后端服务器的压力。

22. vue中的v-if和v-show的区别？

    在v-if来说，这个是是否渲染出这个盒子的，即创建这个dom节点。对于v-show来说，是在渲染之后是否展示，即操作display属性。如果是要频繁切换，就是用v-show更好。

22. vue中的样式穿透如何实现？

    这里问的是在scoped的style标签里面渲染某个外面的样式。参考scss的做法，使用``父元素 /deep/ 子元素``的方法选取到那个标签。

22. 讨论一下vue2中的数据劫持实现原理？

    参考视频[链接](https://www.bilibili.com/video/BV1mf4y1Q7mg?spm_id_from=333.337.search-card.all.click&vd_source=36542d6c49bf487d8a18d22be404b8d2)

    主要是使用`Object.defineProperty`

22. 讨论一下vue3中的数据劫持实现原理？

    参考视频[链接](https://www.bilibili.com/video/BV1Wy4y1y7vb?p=2&vd_source=36542d6c49bf487d8a18d22be404b8d2)

22. 谈谈vue2中对于数组的劫持？

    数组就是使用` object.defineProperty` 重新定义数组的每一项，那能引起数组变化的方法我们都是知道的，` pop` 、` push` 、` shift` 、` unshift` 、` splice` 、` sort` 、` reverse` 这七种，只要这些方法执行改了数组内容，我就更新内容就好了，是不是很好理解。
    
    1. 是用来函数劫持的方式，重写了数组方法，具体呢就是更改了数组的原型，更改成自己的，用户调数组的一些方法的时候，走的就是自己的方法，然后通知视图去更新。
    2. 数组里每一项可能是对象，那么我就是会对数组的每一项进行观测，（且只有数组里的对象才能进行观测，观测过的也不会进行观测）
    
28. vue组件中的data为什么是函数？

    <details>
    <summary>展开查看</summary>
    <pre>
    避免组件中的数据互相影响。同一个组件被复用多次会创建多个实例，如果<code>data</code>是一个对象的话，这些实例用的是同一个构造函数。为了保证组件的数据独立，要求每个组件都必须通过<code>data</code>函数返回一个对象作为组件的状态。
    </pre>
    </details>

29. 解释一下es6新增的proxy和reflect语法？

    使用`new Proxy(target, handler)`创建代理，并且，handler表示的是捕获器。

    proxy的基本方法

    ```javascript
     const obj = {
        name: "copyer",
        age: 12,
     };
     
     const objProxy = new Proxy(obj, {
         /**
          * @param {*} target :目标对象
          * @param {*} key : 键值
          * @param {*} receiver ：代理对象
          */
         get: function (target, key, receiver) {
           console.log("get捕捉器");
           return target[key];
         },
     });
     
     console.log(objProxy.name); // copyer
    ```

    以上的receiver为代理对象objProxy的this的值。可以在操作的时候的使用到这个对象。

    同理，对于proxy的set方法为：

    ```javascript
     const obj = {
       name: "copyer",
       age: 12,
     };
     ​
     const objProxy = new Proxy(obj, {
       /**
        * @param {*} target : 目标对象
        * @param {*} key ：键值
        * @param {*} newValue ：新增
        * @param {*} receiver ：代理对象
        */
       set: function (target, key, newValue, receiver) {
         console.log("set捕捉器");
         target[key] = newValue;
       },
     });
     
     objProxy.age = 23;
     console.log(obj.age); // 23
    ```

    它们两个配合使用

    ```javascript
     const obj = {
       name: "copyer",
       age: 12,
     };
     const objProxy = new Proxy(obj, {
       get: function (target, key, receiver) {
         console.log("get捕捉器");
         return target[key];
       },
     });
     console.log(objProxy.name); // copyer
    ```

    ```javascript
     const obj = {
       name: "copyer",
       age: 12,
     };
     ​
     const objProxy = new Proxy(obj, {
       get: function (target, key, receiver) {
         console.log("get捕获器");
         return Reflect.get(target, key);
       },
       set: function (target, key, newValue, receiver) {
         console.log("set捕获器");
         return Reflect.set(target, key, newValue);
       },
       has: function (target, key) {
         console.log("has捕获器");
         return Reflect.has(target, key);
       },
       deleteProperty: function (target, key) {
         console.log("deleteProperty捕获器");
         return Reflect.deleteProperty(target, key);
       },
       getPrototypeOf: function (target) {
         console.log("getPrototypeOf捕获器");
         return Reflect.getPrototypeOf(target);
       },
       setPrototypeOf: function (target, newObj) {
         return Reflect.setPrototypeOf(target, newObj);
       },
       isExtensible: function (target) {
         console.log("isExtensible捕获器");
         return Reflect.isExtensible(target);
       },
       preventExtensions: function (target) {
         console.log("preventExtensions捕捉器");
         return Reflect.preventExtensions(target);
       },
       getOwnPropertyDescriptor: function (target) {
         console.log("getOwnPropertyDescriptor捕捉器");
         return Reflect.getOwnPropertyDescriptor(target);
       },
       defineProperty: function (target, key, obj) {
         console.log("defineProperty捕捉器");
         return Reflect.defineProperty(target, key, obj);
       },
       ownKeys: function (target, key) {
         console.log("ownKeys捕捉器");
         return Reflect.ownKeys(target, key);
       },
     });
    ```

30. nodejs中的path.resolve和path.join区别

    对于`path.resolve()`来说，是直接返回绝对路径的，并且如果参数中有'../'或者'./'开头的，就也会做拼接。而`path.join()`是直接做字符串的拼接。参考链接http://once-and-only.com/programing/javascript/path-resolve%E3%81%AE%E4%BD%BF%E3%81%84%E6%96%B9/。
    
30. 路由的两种实现方式？

    主要是hash模式和history模式，参考[面试官为啥总是喜欢问前端路由实现方式？ - 掘金 (juejin.cn)](https://juejin.cn/post/7127143415879303204)
    
30. 

    
