# 前端面试基础知识

408知识位于首页的[408文件](../408.md)

参考[掘金链接](https://juejin.cn/post/7016593221815910408)

---

## 面试杂项知识-计算机网络相关

### http与https

http是使用tcp协议获取服务器超文本数据的协议。https是用ssl加密的，安全的http。

http 协议的默认端口为 80，https 的默认端口为 443。

---

### https的工作流程

1. 客户端使用 https url 访问服务器，则要求 web 服务器`建立 ssl 链接`。
2. web 服务器接收到客户端的请求之后，会`将网站的证书（证书中包含了公钥），传输给客户端`。
3. 客户端浏览器通过双方协商一致的安全等级，`建立会话密钥`，然后通过网站的公钥来加密会话密钥，并传送给网站。
4. web 服务器`通过自己的私钥解密出会话密钥`。
5. web 服务器`通过会话密钥加密与客户端之间的通信`。

---

### TCP的三次握手和四次挥手

待补充

---

### TCP/IP保证数据传输的可靠性

对字节流分段并进行编号然后`通过 ACK 回复`和`超时重发`这两个机制来保证。

+ 为了保证数据包的可靠传递，发送方必须把已发送的数据包保留在缓冲区；
+ 并为每个已发送的数据包启动一个超时定时器；
+ 如在定时器超时之前收到了对方发来的应答信息（可能是对本包的应答，也可以是对本包后续包的应答），则释放该数据包占用的缓冲区;
+ 否则，重传该数据包，直到收到应答或重传次数超过规定的最大次数为止。
+ 接收方收到数据包后，先进行CRC校验，如果正确则把数据交给上层协议，然后给发送方发送一个累计应答包，表明该数据已收到，如果接收方正好也有数据要发给发送方，应答包也可方在数据包中捎带过去。

---

### TCP与UDP的区别

参考[掘金](https://juejin.cn/post/6992743999756845087)

+ TCP是面向连接的，UDP是无连接的。
+ TCP仅仅支持单播，UDP支持多播。
+ TCP是可靠的，UDP是不可靠的。
+ UDP的头部开销比TCP的更小，数据传输速率更高，实时性更好。

---

### Cookie、sessionStorage、localStorage 的区别

+ cookie数据大小不能超过4k；sessionStorage和localStorage的存储比cookie大得多，可以达到5M以上。
+ cookie设置的过期时间之前一直有效；localStorage永久存储，浏览器关闭后数据不丢失除非主动删除数据；sessionStorage数据在当前浏览器窗口关闭后自动删除。
+ cookie的数据会自动的传递到服务器；sessionStorage和localStorage数据保存在本地。

---

### JS中类型检测的三种方法

1. ``typeof``关键字

   ```javascript
   console.log(typeof 1);               // number
   console.log(typeof true);            // boolean
   console.log(typeof 'mc');            // string
   console.log(typeof Symbol)           // function
   console.log(typeof function(){});    // function
   console.log(typeof console.log());   // function
   console.log(typeof []);              // object 
   console.log(typeof {});              // object
   console.log(typeof null);            // object
   console.log(typeof undefined);       // undefined
   ```

2. ``instanceof``关键字

   ```javascript
   console.log(1 instanceof Number);                    // false
   console.log(true instanceof Boolean);                // false 
   console.log('str' instanceof String);                // false  
   console.log([] instanceof Array);                    // true
   console.log(function(){} instanceof Function);       // true
   console.log({} instanceof Object);                   // true
   ```

3. ``Object.prototype.toString.call()``方法

   ```javascript
   var toString = Object.prototype.toString;
   console.log(toString.call(1));                      //[object Number]
   console.log(toString.call(true));                   //[object Boolean]
   console.log(toString.call('mc'));                   //[object String]
   console.log(toString.call([]));                     //[object Array]
   console.log(toString.call({}));                     //[object Object]
   console.log(toString.call(function(){}));           //[object Function]
   console.log(toString.call(undefined));              //[object Undefined]
   console.log(toString.call(null));                   //[object Null]
   ```

---

### this的指向问题

+ 作为普通函数执行时，`this`指向`window`。

+ 当函数作为对象的方法被调用时，`this`就会指向`该对象`。

+ 构造器调用，`this`指向`返回的这个对象`。

+ 箭头函数 箭头函数的`this`绑定看的是`this所在函数定义在哪个对象下`，就绑定哪个对象。如果有嵌套的情况，则this绑定到最近的一层对象上。

+ 基于Function.prototype上的 `apply 、 call 和 bind `调用模式，这三个方法都可以显示的指定调用函数的 this 指向。`apply`接收参数的是数组，`call`接受参数列表，`` bind`方法通过传入一个对象，返回一个` this `绑定了传入对象的新函数。这个函数的 `this`指向除了使用`new `时会被改变，其他情况下都不会改变。若为空默认是指向全局对象window。

---

### new运算符的实现机制

1.  首先创建了一个新的`空对象`。
2.  `设置原型`，将对象的原型设置为函数的`prototype`对象。
3. 让函数的`this`指向这个对象，执行构造函数的代码（为这个新对象添加属性）。
4. 判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。

---

### Promise

promise传入一个函数作为参数，这个函数包含两个参数，分别是``resolve``和``reject``，而且它们本身也是函数。示例异步代码：

```javascript
setTimeout(()=>{
    console.log('setTime out 1000 ms');
},1000)
```

包裹后为：

```javascript
new Promise((resolve, reject) => {
    setTimeout(()=>{
        console.log('setTime out 1000 ms');
    },1000)
})
```

可以将之间的log函数写成``resolve()``，这样的话执行到了这里就直接执行then函数。类似于：

```javascript
new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve()
    },1000)
}).then(()=>{
    console.log('then ');
})
```

then函数使用一个函数作为其参数进行使用。promise里面的``resolve()``中使用的参数作为then函数作为参数的函数中的参数进行使用，例如

```javascript
new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve('111argu')
    },1000)
}).then((s)=>{
    console.log('then ');
    console.log(s)
})
```

可以化简如下链式的调用情况

```javascript
setTimeout(() => {
    console.log('第一层');
    console.log('第一层');
    console.log('第一层');
    console.log('第一层');
    setTimeout(() => {
        console.log('第二层');
        console.log('第二层');
        console.log('第二层');
        console.log('第二层');
        setTimeout(() => {
            console.log('第三层');
            console.log('第三层');
            console.log('第三层');
            console.log('第三层');
        }, 1000)
    }, 1000)
}, 1000)
```

可以在then函数中返回设置新的promise对象。

```java
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve()
    }, 1000)
}).then(() => {
    console.log('第一层');
    console.log('第一层');
    console.log('第一层');
    console.log('第一层');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
}).then(() => {
    console.log('第二层');
    console.log('第二层');
    console.log('第二层');
    console.log('第二层');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
}).then(() => {
    console.log('第三层');
    console.log('第三层');
    console.log('第三层');
    console.log('第三层');
})
```

then()函数还能接收两个参数，实际上是then()和catch()两个参数的简写。

**promise的三种状态**

+ pending：等待状态，比如正在进行网络请求
+ fulfill：满足状态，主动回调了resolve()时就是这个状态，会回调then()
+ reject：拒绝状态，主动回调了reject()时就是这个状态，会回调catch()

形如以上的三层链式调用的代码（代码位于code/js/other/promise/化简链式.js），如果第二第三层中没有异步操作的话，还可以有简写形式。

使用``return Promise.resolve(res)``的方法。

例如以下的代码

```javascript
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve()
    }, 1000)
}).then(() => {
    console.log('第一层');
    console.log('第一层');
    console.log('第一层');
    console.log('第一层');
    return new Promise((resolve, reject) => {
        resolve()
    })
}).then(() => {
    console.log('第二层');
    console.log('第二层');
    console.log('第二层');
    console.log('第二层');
    return new Promise((resolve, reject) => {
        resolve()
    })
}).then(() => {
    console.log('第三层');
    console.log('第三层');
    console.log('第三层');
    console.log('第三层');
})
```

可以化简为：

```javascript
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve()
    }, 1000)
}).then(() => {
    console.log('第一层');
    console.log('第一层');
    console.log('第一层');
    console.log('第一层');
    return Promise.resolve()
}).then(() => {
    console.log('第二层');
    console.log('第二层');
    console.log('第二层');
    console.log('第二层');
    return Promise.resolve()
}).then(() => {
    console.log('第三层');
    console.log('第三层');
    console.log('第三层');
    console.log('第三层');
})
```

甚至以上代码的``return Promise.resolve()``都可以直接省略.

代码位于``code/js/other/promise/化简非异步链式.js``

**异常的问题**

在链式的调用的过程中可以使用``throw``的语法糖来直接调用链式的某一次的catch函数。之后的链式结构都不会继续执行。

```javascript
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve()
    }, 1000)
}).then(() => {
    console.log('第一层');
    console.log('第一层');
    console.log('第一层');
    console.log('第一层');
	return //这里如果调用resolve()无参数的话可以直接省略d
}).then(() => {
    console.log('第二层');
    console.log('第二层');
    console.log('第二层');
    throw "x出现错误，调用catch"
    console.log('第二层');

}).then(() => {
    console.log('第三层');
    console.log('第三层');
    console.log('第三层');
    console.log('第三层');
}).catch((err)=>{
    console.log(err);
})

/*
第一层
第一层
第一层
第一层
第二层
第二层
第二层
x出现错误，调用catch
*/
```

** 顺序 **
先执行promise里面的的同步代码，然后再执行then里面的异步代码，可以使用事件循环来解释。
```javascript
new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve('111argu');
        console.log('after resolve');
        reject('reject')
    },1000)
}).then((s)=>{
    console.log('then ');
    console.log(s)
}).catch((e)=>{
    console.log(e);
}).finally(()=>{
    console.log('finally');
})
```
以上代码输出
after resolve
then 
111argu
finally

---

### 防抖和节流

#### 具体场景

节流：滚动加载更多、搜索框搜的索联想功能、高频点击、表单重复提交
防抖：搜索框搜索输入，并在输入完以后自动搜索、手机号，邮箱验证输入检测、窗口大小 resize 变化后，再重新渲染

#### 代码说明

```javascript
/**
 * 节流函数 一个函数执行一次后，只有大于设定的执行周期才会执行第二次。有个需要频繁触发的函数，出于优化性能的角度，在规定时间内，只让函数触发的第一次生效，后面的不生效。
 * @param fn要被节流的函数
 * @param delay规定的时间
 */
function throttle(fn, delay) {
    //记录上一次函数触发的时间
    var lastTime = 0;
    return function(){
        //记录当前函数触发的时间
        var nowTime = Date.now();
        if(nowTime - lastTime > delay){
            //修正this指向问题
            fn.call(this);
            //同步执行结束时间
            lastTime = nowTime;
        }
    }
}

document.onscroll = throttle(function () {
    console.log('scllor事件被触发了' + Date.now());
}, 200); 

/**
 * 防抖函数  一个需要频繁触发的函数，在规定时间内，只让最后一次生效，前面的不生效
 * @param fn要被节流的函数
 * @param delay规定的时间
 */
function debounce(fn, delay) {
    //记录上一次的延时器
    var timer = null;
    return function () {
       //清除上一次的演示器
        clearTimeout(timer);
        //重新设置新的延时器
        timer = setTimeout(function(){
            //修正this指向问题
            fn.apply(this);
        }, delay); 
    }
}
document.getElementById('btn').onclick = debounce(function () {
    console.log('按钮被点击了' + Date.now());
}, 1000);

```

---

针对视图的长宽

```html
    <style>
        .inner {
            width: 1vmin;
            height: 1vmin;
            background: blue;
        }
    </style>
```

根据CSS3规范，视口单位主要包括以下4个：

1. vw：相对于视口的宽度， 视口被均分为 100 单位的vw，1vw等于视口宽度的1%。

2. vh：相对于视口的宽度， 视口被均分为 100 单位的vh，1vh等于视口高度的1%。

3. vmin：选取vw和vh中最小的那个。

4. vmax：选取vw和vh中最大的那个。

---

