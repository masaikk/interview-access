

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

### Vue生命周期

![img](vue.assets/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3poYW5ndmFsdWU=,size_16,color_FFFFFF,t_70.png)

https://segmentfault.com/a/1190000011381906

---

### Vue3父子组件传递值

这里不想看网课，暂时通过看博客复习这个。看不懂再回来P11

参考如下博客：

https://juejin.cn/post/6965062549771386887

---

### Vue源码部分解读

P19 P20 P21

*讲是讲得不错，可是我已经没有时间了。但是之后一定要回来看完。*

---

### vue-router

router-link的replace属性代表着url是否会被压栈。默认没这个属性就不会压栈。

#### 懒加载

类似于如下代码

```javascript
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
```

这样的话可以讲打包后的js文件分开，并且在打包的时候也可以指定打包后的js文件的名字，例如

```javascript
component: () => import(/* webpackChunkName: "type-chunk" */'../views/Type.vue')
```

打包后的文件如下

![image-20220210174219899](vue.assets/image-20220210174219899.png)

#### 路由中的name属性

可以通过名字来跳转

#### 路由中的meta属性

传入一个对象来承载自定义数据

#### 动态路由匹配

类似Django的urls，使用匹配的方式来设置动态路由

```javascript
    {
        path: '/user/:uid',
        name: 'user',
        component: () => import(/* webpackChunkName: "user-chunk" */'../views/User.vue')
    }
```

相应的，在App.vue文件里面的view-linker也要修改``<router-link to="/user/10">我</router-link>``

可以在vue文件里面通过``this.$route``来访问

![image-20220210182143760](vue.assets/image-20220210182143760.png)

或者使用vue-router4以上提供的hook函数

```javascript
import { useRoute } from 'vue-router'

  setup(){
    const route = useRoute();
    console.log(route.params.uid);
  },
```

#### NotFound

如果路由没有匹配到，显示的页面

```javascript
    {
        path: "/:pathMatch(.*)*",
        component: ()=>import(/* webpackChunkName: "PageNotFound"*/'../views/NotFound.vue')
    }
```

注意要放在urls的最下面

而且能通过代码``$route.params.pathMatch``拿到。

#### 路由嵌套

等于向路由列表里面添加children属性

```javascript
{
        path: '/father',
        name: 'father',
        component: ()=>import(/* webpackChunkName: "father-chunk" */'../views/Father.vue'),
        children:[
            {
                path: 'son1',
                component:()=>import(/* webpackChunkName: "son1-ch"*/'../views/FatherSon1.vue')

            },
            {
                path: 'son2',
                component:()=>import(/* webpackChunkName: "son2-ch"*/'../views/FatherSon2.vue')

            },
        ]
    },
```

**并且注意，子路由不需要加上``\``**

#### 用代码跳转路由

注意\$router和\$route区别

```javascript
  methods:{
    jumpToFather(){
      this.$router.push('/father')
    }
  }
```

也提供了在setup()里面使用的hook

先``import {useRouter} from 'vue-router';``

```javascript
setup(){
    const router = useRouter();
    const jumpToFatherInSetupFunc=()=>{
      router.push('/father')
    }
    return {
      jumpToFatherInSetupFunc
    }
  }
```

### 动态添加路由

添加顶级路由，可以使用router对象的``addRoute``方法。

```javascript
router.addRoute({
    path:"/o1",
    name:"otherPage1",
    component:()=>import('../views/OtherPages1.vue')
})
```

添加二级路由，也可以使用上述方法，不过不同之处在于需要添加父路由的name属性作为传参。

而且需要注意，子路由的匹配规则不需要第一个``/``

代码如下所示：

```javascript
//添加二级路由
router.addRoute('father',{
    path:"o1",
    name:"otherPage1",
    component:()=>import('../views/OtherPages1.vue')
})
```

---

### VueX

p24

注意不能用在component里面操作state，而是应该在mutations里面注册函数，用于修改state。

```javascript
import { createStore } from 'vuex'

export default createStore({
  state: {
    counter:0,
  },
  mutations: {
      increment(state){
          state.counter++;
      },
      decrement(state){
          state.counter--;
      }
  },
  actions: {
  },
  modules: {
  }
})
```

注意，在component中需要使用commit来注册mutations$\bigstar$

```javascript
  methods: {
    incre() {
      this.$store.commit('increment');
    },
    decre() {
      this.$store.commit('decrement');
    }
  }
```

最终component中使用state的代码为

```javascript
<p>This counter is {{ this.$store.state.counter }}</p>
```

整个component的代码为

```javascript
<template>
  <div>
    <p>This counter is {{ this.$store.state.counter }}</p>
    <div>
      <button @click="incre">increment</button>
      <button @click="decre">decrement</button>

    </div>
  </div>

</template>

<script>
export default {
  name: "CounterComp",
  methods: {
    incre() {
      this.$store.commit('increment');
    },
    decre() {
      this.$store.commit('decrement');
    }
  }
}
</script>
```

也可以将获取store的逻辑写道computed里面

```javascript
  computed:{
    sCounterNumber(){
      return this.$store.state.counter;
    }
  },
```



**单一状态树**

VueX推荐只使用一个``$store`` 
