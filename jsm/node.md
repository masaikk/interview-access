# node

这里是node底层的学习笔记，包括v8引擎以及node服务端的知识

## v8引擎

<img src="node.assets/v2-4dce785ff4595de55623611ab0055d33_1440w.jpg" alt="认识 V8 引擎" style="zoom:33%;" />

### v8引擎原理

参考[认识 V8 引擎 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/27628685)

![img](node.assets/aHR0cHM6Ly91c2VyLWdvbGQtY2RuLnhpdHUuaW8vMjAyMC80LzI1LzE3MWIwNzkzMGNiNzViNTc)

webkit调用v8的结构

![preview](node.assets/v2-ad0a86d3faf223164a9bd22658feadc3_r.jpg)

首先是网页内容，输入到HTML解析器，HTML解析器解析，然后构建DOM树，在这期间如果遇到JavaScript代码则交给JavaScript引擎处理；如果来自CSS解析器的样式信息，构建一个内部绘图模型。该模型由布局模块计算模型内部各个元素的位置和大小信息，最后由绘图模块完成从该模型到图像的绘制。

而具体在v8引擎中：

源代码-→抽象语法树-→字节码-→JIT-→本地代码(V8引擎没有中间字节码)。

*在运行JavaScript之前，相比其它的JavaScript的引擎转换成字节码或解释执行，V8将其编译成原生机器码（IA-32, x86-64, ARM, or MIPS CPUs），并且使用了如内联缓存（inline caching）等方法来提高性能。*

---

### v8的内存回收

---

### v8的promise

---

## webkit

## NestJS

参考掘金小册[NestJS 项目实战 - CookieBoty - 掘金小册 (juejin.cn)](https://juejin.cn/book/7065201654273933316)使用`nest new mynest`创建一个叫做mynest的项目，在此之前需要安装cli工具`npm install -g @nestjs/cli`。我的代码位于[mynest: nestjs的demo (gitee.com)](https://gitee.com/masaikk/mynest)。运行之后打开http://127.0.0.1:3000/可以看到：

![image-20221101164213248](node.assets/image-20221101164213248.png)





