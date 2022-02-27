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

1. ``typeof``

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

2. ``instanceof``

   ```javascript
   console.log(1 instanceof Number);                    // false
   console.log(true instanceof Boolean);                // false 
   console.log('str' instanceof String);                // false  
   console.log([] instanceof Array);                    // true
   console.log(function(){} instanceof Function);       // true
   console.log({} instanceof Object);                   // true
   ```

3. ``Object.prototype.toString.call()``

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
