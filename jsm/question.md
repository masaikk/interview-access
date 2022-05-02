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

18. 
