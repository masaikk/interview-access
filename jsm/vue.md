# Vue3

学习vue3及其相关组件的笔记。代码位于[myvue: vue前端学习 (gitee.com)](https://gitee.com/masaikk/myvue)的vue3分支。

---

## vue项目基础

### Vue-cli相关知识

**vue-cli-service封装了webpack**

例如demo1/node_modules/@vue/cli-service/package.json中，指定了bin所指向的二进制文件的位置。

```json
{
      "bin": {
    "vue-cli-service": "bin/vue-cli-service.js"
  },
}
```

P10中详细介绍了webpack在vue-cli-service的源码解读，之后需要可以回来看。

**vue-cli的运行原理**

![image-20220207215159625](vue.assets/image-20220207215159625.png)

---

### vite

P10讲到了，很快，但是目前社区支持不够。

---

### Vue3父子组件传递值

这里不想看网课，暂时通过看博客复习这个。看不懂再回来P11

---

### Vue源码部分解读

P19 P20 P21

*讲是讲得不错，可是我已经没有时间了。*

---

### vue-router

router-link的replace属性代表着url是否会被压栈。默认没这个属性就不会压栈。
