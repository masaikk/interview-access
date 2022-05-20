# Vue3

学习vue3及其相关组件的笔记。代码位于[myvue: vue前端学习 (gitee.com)](https://gitee.com/masaikk/myvue)的vue3分支。笔记源文件位于[jsm/vue.md · masaikk/interviewAccess - 码云 - 开源中国 (gitee.com)](https://gitee.com/masaikk/interview-access/blob/master/jsm/vue.md)

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

[参考链接](https://segmentfault.com/a/1190000011381906)





---

### Vue3父子组件传递值

参考如下博客：

https://juejin.cn/post/6965062549771386887

父传子是使用props的方法，子传父使用``$emit``的方法。

示例子组件向父组件传递信息：

```javascript
//子组件
  methods:{
    sendEmitToFather(){
      console.log('sending...');
      this.$emit('son-mege','Hello from son')
    }
  }
```

父组件中在节点上绑定消息，传入函数

```javascript
<template>
  <div>
    <p>
      {{ mess }} in father page
    </p>
    <div>
      <use-props :son-data=this.mess @son-mege="getMessageFromSon"></use-props>
    </div>

  </div>
</template>

<script>
import useProps from "@/components/compisi/useProps";


export default {
  name: "CompPage",
  components: {useProps},
  data() {
    return {
      mess: 'from composition page'
    }
  },
  composition: {
    useProps
  },
  methods:{
    getMessageFromSon(data){
      console.log(data);
    }
  }
}
</script>
```

自动传入data数据，打印的情况如下所示

![image-20220322102009438](vue.assets/image-20220322102009438.png)

---

### props

这里是父向子传递数据的方式之一。

首先在自组件中声明props，如下所示：

```javascript
export default {
  name: "useProps",
  props: {
    sonData: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      mess: "use data props"
    }
  }
}
```

其中，props可以是数组也可以是对象。

然后在父组件中使用子组件中传入props参数，如下所示：

```javascript
    <div>
      <use-props :son-data=this.mess></use-props>
    </div>
```

完整代码为``demo2/src/views/CompPage.vue``

---

### provide和inject

*用于非父子组件之间的共享数据。*

如果有一些嵌套的深层组件，使用props一直往下传递无疑是很麻烦的。所以这种情况下可以使用provide和inject。有如下特性：

+ 无论层级结构有多深，父组件都可以作为其所有子组件的依赖提供者。
+ 父组件使用provide来提供数据。
+ 子组件使用inject来使用数据。
+ 可以看成是long range props

以下是代码演示。

例子是创建了三个组件，按顺序是provide,home和homeson，展示如下：

![image-20220414105315185](vue.assets/image-20220414105315185.png)

可以在爷组件provide里面写下provide属性，表示提供这个数据。爷组件不需要管这个数据有没有用上。

```vue
<script>
import home from "@/components/useProvide/home";
export default {
  name: "provide",
  components: {
    home,
  },
  provide: {
    pp1: "some data",
    pp2: "other data",
  },
};
</script>
```

在孙节点homeson里面进行接收，使用inject

```vue
<template>
  <div>
    <div>home-son</div>
    <div>inject value: {{ pp1 }}-{{ pp2 }}</div>
  </div>
</template>

<script>
export default {
  name: "homeson",
  inject: ["pp1", "pp2"],
};
</script>

<style scoped></style>

```

即可正常展示

![image-20220414110419756](vue.assets/image-20220414110419756.png)



实际开发情况里面，provide里面的数据不能像上述例子里面一样写死。而是放在data里面。

并且如果使用上方``provide:{}``的写法，里面的this是``undefined``。所以更推荐``provide(){return{}}``写法，这里的this就有指向。即可使用this来引用data里面的数据。

```vue
<template>
  <div>
    <div>
      <p>provide</p>
    </div>
    <div>
      <home></home>
    </div>
  </div>
</template>

<script>
import home from "@/components/useProvide/home";

export default {
  name: "provide",
  components: {
    home,
  },
  provide() {
    return {
      pp1: "some data",
      pp2: "other data",
      da: this.dataV,
    };
  },
  data() {
    return {
      dataV: "data from data",
    };
  },
};
</script>

<style scoped></style>

```

参考代码``demo2/src/views/provide.vue``

如果想要响应的话，使用``computed``

```javascript
  provide() {
    return {
      pp1: "some data",
      pp2: "other data",
      da: computed(() => this.dataV),
    };
  },
```

---

### Slot

可以使用默认插槽，例如

```vue
<template>
  <div id="son">
    <div>显示插槽的组件</div>
    <div>
      <slot>
        <i>这里是默认插槽元素</i>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "useSlot1",
};
</script>

<style scoped>
#son {
  border: #2c3e50 dashed 1px;
  background-color: aliceblue;
}
</style>

```

在父节点中展示即可

```vue
<template>
  <div>
    <div>使用插槽的父组件</div>
    <div>
      <use-slot1></use-slot1>
    </div>
  </div>
</template>

<script>
import useSlot1 from "@/components/compisi/useSlot1";
export default {
  name: "slotHolder",
  components: {
    useSlot1,
  },
};
</script>

<style scoped></style>

```

显示的效果：

![image-20220414141619842](vue.assets/image-20220414141619842.png)

#### 普通插槽

如果传入插槽，就不显示默认插槽内容

```html
    <div>
      <use-slot1>
        <el-button>不使用默认插槽而是使用DOM</el-button>
      </use-slot1>
    </div>
```

![image-20220414141947059](vue.assets/image-20220414141947059.png)

#### 具名插槽

参考代码``demo2/src/components/compisi/useSlot2.vue``，使用flex将样式展示为如下形式：

![image-20220414154546894](vue.assets/image-20220414154546894.png)

初始代码

```vue
<template>
  <div id="use-slot2">
    <div class="left">
      <slot></slot>
    </div>
    <div class="center">
      <slot></slot>
    </div>
    <div class="right">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "useSlot2",
};
</script>

<style scoped>
#use-slot2 {
  display: flex;
  width: 400px;
}

#use-slot2 > div {
  height: 50px;
  margin-top: 40px;
  border: #2c3e50 dotted 0.5px;
}

.left,
.right {
  width: 80px;
  background-color: aliceblue;
}

.center {
  flex: 1;
}
</style>

```

我们希望在插槽处传入三个slot然后分别渲染到以上的三块部分。

直接使用的话

```vue
    <div id="slot2holder">
      <use-slot2>
        <el-button>左边的内容</el-button>
        <el-button>中间的内容</el-button>
        <el-button>右边的内容</el-button>
      </use-slot2>
    </div>
```

会显示：

![image-20220414155219975](vue.assets/image-20220414155219975.png)

所以如果不指定名字的话，每个插槽都会分配到各个``<slot\>``中，所以需要使用具名插槽。

应该使用``<template>``标签以及``v-slot``属性。

在父组件中应该这样使用

```vue
    <div id="slot2holder">
      <use-slot2>
        <template v-slot:left><el-button>左边按钮</el-button></template>
        <template v-slot:center><el-button>中间按钮</el-button></template>
        <template v-slot:right><el-button>右边按钮</el-button></template>
      </use-slot2>
    </div>
```

使用``v-slot``来指定各个插槽的名字。

在子组件中使用的时候需要通过``<slot>``的``name``属性来指定具体要渲染的插槽模板。例如：

```vue
<template>
  <div id="use-slot2">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
```

展示的效果如下：

![image-20220414155926427](vue.assets/image-20220414155926427.png)

代码位于``demo2/src/components/compisi/useSlot2.vue``

同时，子组件里面的slot的name属性也可以结合子组件的props属性，都通过父组件的传入的值进行渲染。更具有普适性。

---

### keep-alive

---

### animation

使用``<transition>``会比单纯的使用``v-if``显得更加平滑。参考代码：

```vue
<template>
  <div>
    <p>set1</p>
    <el-button @click="isShow=!isShow">显示/隐藏</el-button>
  </div>
  <transition name="set1">
    <h2 v-if="isShow">some message</h2>
  </transition>

</template>

<script>
export default {
  name: "animationsSet1",
  data() {
    return {
      isShow: true
    }
  }
}
</script>

<style scoped>
.set1-enter-from,
.set1-leave-to {
  opacity: 0;
}
.set1-enter-to,
.set1-leave-from {
  opacity: 1;
}

.set1-enter-active,
.set1-leave-active{
  transition: opacity 2s ease;
}

</style>

```

![image-20220425144201638](vue.assets/image-20220425144201638.png)

这里就有两秒的淡入淡出效果。

原理：当插入或者删除包含在transition组件里面的元素的时候，vue将进行以下处理：

1. 自动嗅探目标元素是否应用了CSS过渡或者动画，如果有，那么在恰当的时机添加/删除CSS类名。
2. 如果transition组件提供了JavaScript钩子函数，这些钩子函数将在恰当的时机被调用。
3. 如果没有找到JavaScript的钩子函数也没有找到CSS过渡动画，那么DOM的插入或者删除操作会立即进行。

如同以上代码说明，使用了``name='set1'``，就会自动添加类``.set1-enter-active``等等。

在进入/离开的过渡中，会有 6 个 class 切换。

1. `v-enter-from`：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
2. `v-enter-active`：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
3. `v-enter-to`：定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 `v-enter-from` 被移除)，在过渡/动画完成之后移除。
4. `v-leave-from`：定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
5. `v-leave-active`：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
6. `v-leave-to`：离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 `v-leave-from` 被移除)，在过渡/动画完成之后移除。

![Transition Diagram](vue.assets/transitions.svg)添加CSS动画：

```css
.set2-enter-active
{
  animation: bounce 2s ease;
}
.set2-leave-active{
  animation: bounce 1s ease reverse;
}
@keyframes bounce {
  0%{
    transform: scale(0);
  }

  50%{
    transform: scale(1.2);
  }

  100%{
    transform: scale(1);
  }
}
```



---

### Composition API

P15 重要

#### Mixin

复用的代码，如果Mixin与组件中出现命名冲突

#### options API 的弊端

某一个功能的各个逻辑会拆分到各个属性中。如果这个组件变得更大，那么拆分的会越来越散，难以阅读。

#### setup函数

传入props与context参数。对应着父传子的props。

setup因为比beforeCreated()函数还前，所以没有this对象。

在setup中记录props为一个proxy对象

```javascript
  setup(props, context) {
    console.log(props);
  },
```

![image-20220321194308853](vue.assets/image-20220321194308853.png)

另一个参数context，它包括三个属性：

+ attrs：所有非prop的attribute
+ slots：父组件的插槽
+ emit：$emit

或者直接使用解构写法来获取着三个属性

```javascript
  setup(props, {attrs, slots, emit}) {
    console.log(attrs);
    console.log(slots);
    console.log(emit);
  },
```

![image-20220321204335552](vue.assets/image-20220321204335552.png)

#### setup的返回

返回一个对象，也可以在组件中使用，比如

```javascript
  setup(props, {attrs, slots, emit}) {
    console.log(attrs);
    console.log(slots);
    console.log(emit);
    return {
      messSetup: "message form setup function"
    }
  },
```

以上参考代码位于``demo2/src/components/compisi/useProps.vue``

#### 响应式

使用reactive获取响应式对象，（这样的话数据如果有变化也能渲染到DOM里面）

此处代码位于``demo2/src/components/compisi/useSetup.vue``

例如:

```javascript
  setup(props, context) {

    const state=reactive({
      counter:100,
      tittle: "counter",
    })

    const increment = () => {
      state.counter++;
    }

    return {
      state,
      increment
    }
  }
```

reactive的参数只能是对象或者数组。基本数据类型需要用``ref``。

ref对象在template中被使用的时候，可以省略``.value``属性，称之为“自动解包”。在setup函数中，没有这个功能，必须要使用``.value``属性。例如：

```javascript
    let refCounter=ref(200);

    const state=reactive({
      counter:100,
      tittle: "counter",
    })

    const increment = () => {
      state.counter++;
      refCounter.value++;
      console.log(refCounter.value);
    }
```

使用``readonly``关键字得到一个原生对象的只读代理，即一个set方法被劫持的Proxy对象。例如：

```javascript
    const readOnlyInfo=readonly({
      tittle:"a setup counter"
    })
```

#### 相关语法

![image-20220326131348626](vue.assets/image-20220326131348626.png)

#### toRef和toRefs

都是收一个响应式对象的。

使用toRefs将响应式对象解包成数个ref，使用如下语法

```javascript
let { defaultMessage, defaultAudioURL } = toRefs(props);
```

使用toRef是将reactive对象中的某件键转化为ref对象。

#### watch

第一个参数是一个函数，返回一个需要监听的值。

```javascript
const state = reactive({ count: 0 })
watch(
  () => state.count,
  (count, prevCount) => {
    /* ... */
  }
)
```

#### watchEffect和watch的区别

``watchEffect``会首先执行一次，然后记录下来里面有多少个可响应对象，最后然后里面的可响应对象有变化，就出现执行。默认的``watchEffect``会在挂载之前就运行，或者可以使用传入参数``{flush:"post"}``来让它挂载之后再运行。

``watch``不会一开始就执行，记录某一个可响应对象的变化后执行。

#### 通过ref来获取dom

设置节点的ref属性，然后使用ref来获取，结合上述的watchEffect。要注意的是，这个对象必须要在挂载之后才能运行，使用钩子函数``onMounted``，或者监听变化：

```javascript
    <h2 ref="title">
      哈哈哈
    </h2>


setup(){
    const title=ref(null)
    watchEffect(()=>{
      console.log(title.value);
    })
}
```

代码位于``demo2/src/components/compisi/useSetup2.vue``

获取audio节点

定义如下``<audio controls src="http://119.23.182.180/azur/t1.mp3" ref="audioNode"></audio>``

使用flush设置为``post``的``watchEffect``，如下所示：

```javascript
    const audioNode=ref(null)
    watchEffect(()=>{
      console.log(audioNode.value.src);
      audioNode.value.src="http://119.23.182.180/azur/t2.mp3"
      audioNode.value.play()
    },{
      flush:"post"
    })
```

---

### Vue源码部分解读

P18 P19 P20 P21

#### Vue网课部分

##### 虚拟DOM渲染

虚拟DOM渲染的时候更加方便，可以用diff算法来判断对比VNode（是一个JavaScript对象）之间的不同。*结合重绘和重排知识点。*

渲染过程如下：

![image-20220414172608641](vue.assets/image-20220414172608641.png)

##### mini-Vue的实现

主要包括以下三个模块：

+ 渲染系统模块
  + h函数，用于返回一个VNode对象
  + mount函数，用于将VNode挂载到DOM上
  + patch函数，用于对两个VNode进行对比，决定如何处理新的VNode
+ 可响应式系统模块
+ 应用程序入口模块

将vue文件里面的``template``标签渲染为调用h函数的，是使用了vue的编译插件，这里不讨论。

**h函数的实现**

思考Vue里面的h函数，主要传入了三个参数，第一个是标签名称，第二个是props比如说各个属性，第三个是内容或者是数组表示子节点，里面也包含h函数渲染出来的VNode。如下所示：

```javascript
    const VNode = h('div', {'class': 'why'}, [
        h('h2', null, '计数：100'),
        h('button', null, '+1')
    ])
```

大概是这样的实现情况

```javascript
const h = (tag, props, children) => {
  // 渲染VNode对象
  return {
    tag,
    props,
    children,
  };
};
```

简易的VNode如上所示，是树状的结构。在控制台打印输出如下：

![image-20220415114259993](vue.assets/image-20220415114259993.png)

**mount函数的实现**

用于将刚才的VNode转化成真实的DOM节点然后挂载到DOM上面。例如``mount(vnode, document.querySelector('#app'));``

还需要将vnode对象也保存一个DOM节点。参考代码如下所示：

```javascript
const mount = (vnode, container) => {
  // 1,创建真实的DOM元素
  const el = (vnode.el = document.createElement(vnode.tag));

  // 2,处理props
  if (vnode.props) {
    for (const key in vnode.props) {
      const value = vnode.props[key];

      //这里判断一些onclick之类的绑定的事件
      if (key.startsWith("on")) {
        // 绑定原生事件
        el.addEventListener(key.slice(2).toLowerCase(), value);
      } else {
        el.setAttribute(key, value);
      }
    }
  }

  // 3,处理children
  if (vnode.children) {
    // 如果只是一个字符串类型
    if (typeof vnode.children === "string") {
      el.textContent = vnode.children;
    } else {
      // 数组情况
      vnode.children.forEach((item) => {
        mount(item, el);
        //将每个数组里面的元素挂载到el里面
      });
    }
  }

  // 4,挂载到container上面;
  container.appendChild(el);
};
```

在此上，处理创建节点、遍历处理props、处理children（如有就递归调用mount）和挂载整个真实DOM节点。

**patch函数的实现**

用于比较新的vnode和旧的vnode，得出它们之间的不同。

传入两个vnode对象，分别代表旧vnode和新vnode。

首先比较tag，如果tag都不一样那么直接替换。

```javascript
if (n1.tag !== n2.tag) {
    //如果连标签都不同的话那么就直接替换。
    const n1ElParent = n1.el.parentElement;
    // 通过n1的el属性拿到整个DOM节点，再根据它拿到父节点准备去移除它。

    n1ElParent.removeChild(n1.el);
    mount(n2, n1ElParent);
    //删除n1，挂载n2
  } else {
  }
```

如果类型相同的话，应该先去取出n1的DOM对象然后在n2中的el进行保存。

```javascript
// 1,保存n1的el属性
    const el = (n2.el = n1.el);
```

然后处理props，分别是添加新的props和移除旧的vnode中应该被remove的props

```javascript
    // 2,处理props
    // 如果props是undefined，就返回一个空对象
    const oldProps = n1.props || {};
    const newProps = n2.props || {};

    // 2.1把新的props添加到el中
    for (const key in newProps) {
      const oldValue = oldProps[key];
      const newValue = newProps[key];
      if (newValue !== oldValue) {
        //如果不同，就用新的把旧的盖掉
        //这里判断一些onclick之类的绑定的事件
        if (key.startsWith("on")) {
          // 绑定原生事件
          el.addEventListener(key.slice(2).toLowerCase(), newValue);
        } else {
          el.setAttribute(key, newValue);
        }
      }
    }
    //2.2 把旧的props删掉
    for (const key in oldProps) {
      if (!(key in newProps)) {
        //这里判断一些onclick之类的绑定的事件
        if (key.startsWith("on")) {
          // 删除原生事件
          el.removeEventListener(key.slice(2).toLowerCase());
        } else {
          el.removeAttribute(key);
        }
      }
    }
```

之后是处理children，这里要关心children是否是字符串或者数组的情况。

下面表示的是除了新的children和旧的children都是数组的情况。

```javascript

    // 3，处理children
    const oldChildren = n1.children || [];
    const newChildren = n2.children || [];

    if (typeof newChildren === "string") {
      //如果新的child是字符串
      if (typeof oldChildren === "string") {
        if (newChildren !== oldChildren) {
          el.textContent = newChildren;
          //如果新旧子节点都是字符串而且不相等的话，就直接使用textContent属性换
        } else {
          el.innerHTML = newChildren;
          //否则就直接把整个新的字符串来赋值
        }
      }
    } else {
      //如果新的child不是字符串，而是数组
      if (typeof oldChildren === "string") {
        el.innerHTML = "";
        newChildren.forEach((item) => {
          mount(item, el);
          //挂载新的children
        });
      } else {
        // 如果旧的child不是字符串而是数组
        //这里结合diff算法和vue中结合key的优化
        //代码待补充
      }
    }
```

对于diff函数处理两个都是数组的情况（不考虑可以），遵循以下操作：

1. 前面有相同节点的原生进行patch操作
2. 如果new更长，就对更长的部分直接mount
3. 如果old更长，就对更长的部分直接移除

```javascript
       // 1.前面有相同节点的进z行原生的patch操作
        const commonLength = Math.min(oldChildren.length, newChildren.length);
        for (let i = 0; i < commonLength; i++) {
          patch(oldChildren[i], newChildren[i]);
        }
        // 2.newChildren>oldChildren
        if (newChildren.length > oldChildren.length) {
          //对于更长部分进行遍历
          newChildren.slice(oldChildren.length).forEach((item) => {
            //直接挂载
            mount(item, el);
          });
        }
        // 3.newChildren<oldChildren
        if (newChildren.length < oldChildren.length) {
          oldChildren.slice(newChildren.length).forEach((item) => {
            el.removeChild(item);
            //对更长的节点进行移除操作
          });
        }
```

**响应式系统的实现**

P19

数据劫持

Vue2中的实现：

太难了之后回来再看。





#### Vue博客

[Introduction · 深入剖析Vue源码 (penblog.cn)](https://book.penblog.cn/)

---

### vue-router

router-link的replace属性代表着url是否会被压栈。默认没这个属性就不会压栈。

#### 导入vue-router

使用如以下代码安装依赖 

``npm install vue-router@next``

在导入声明的时候可以使用``import type { RouteRecordRaw } from "vue-router";``的形式来声明导入的是type。

参考代码：

```typescript
import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: () => import(""),
  },
];

const router = createRouter({
  routes: [],
  history: createWebHashHistory(),
});

export default router;
```

然后在main.ts中进行注册：

```typescript
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(router);
app.mount("#app");
```

最后在App.vue中引入``<router-view></router-view>``

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

#### 导入

使用``npm install vuex@next --save``安装

创建store/index.ts

```typescript
import { createStore } from "vuex";

const store = createStore({
  state: () => {
    return {
      name: "masaikk",
    };
  },
});

export default store;
```

然后在main.ts中进行注册

```typescript
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
```

使用时``<p>{{ $store.state.name }}</p>``

#### 基础知识

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

#### setup里面使用store

使用vuex提供的``useState``hook，配合``computed``的hook。

```javascript
  setup() {
    const store = useStore();
    const sCounter = computed(() => store.state.counter);
    return {
      sCounter
    }
  },
```

#### VueX的getters

对于getters的方法来说，对于每个函数都要传入state参数，然后方法中使用state获取状态。

```javascript
    getters: {
        totalPrice:(state)=> {
            let totalPrice = 0;
            for (const book of state.books) {
                totalPrice += book.price * book.number;
            }
            return totalPrice;
        }
    }
```

具体在使用的时候使用``this.$store.getters.name``来使用getters的值。

```javascript
  computed: {
    totalPrice() {
      return this.$store.getters.totalPrice;
    }
  }
```

代码位于demo2/src/components/UseStoreUtils.vue

或者传入两个参数``(state,getters)``用于调用其他的getters方法

#### 单一状态树

VueX推荐只使用一个``$store`` 

---

### Axios封装

#### axios类封装

先尝试在main.ts中使用封装的AXIOS实例。

思考的步骤如下所示：

1. 创建自己的request类，封装好axios实例，构造函数和request函数。
2. 查看axios的声明文件，分析给定的类型声明，比如``AxiosRequestConfig``和``AxiosInstance``等。
3. 封装好自己的静态配置到另一个ts文件中，再导出配置文件。
4. 在自己的类的声明文件中导入之前的配置文件，new这个class对象，使用构造函数初始化自己的axios实例，导出这个对象。
5. 在main.ts中导入这个对象，测试。

下面是代码说明：

创建好自己的静态配置类：

```typescript
let BASE_URL = "";
const TIME_OUT = 10000;

if (process.env.NODE_ENV === "development") {
  BASE_URL = "http://119.23.182.180:10001/form/";
} else {
  BASE_URL = "http://119.23.182.180:10001/form/";
}

export { BASE_URL, TIME_OUT };

```

这里就可以区分生产环境和开发环境。

然后，可以声明自己封装的对象并且导出，这里简单声明了一个request方法

```typescript
import axios, { AxiosResponse } from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

class MasaikkRequest {
  instance: AxiosInstance;

  constructor(config?: AxiosRequestConfig) {
    this.instance = axios.create(config);
  }

  request(config: AxiosRequestConfig): void {
    this.instance.request(config).then((response: AxiosResponse) => {
      console.log(response);
    });
  }
}

export default MasaikkRequest;

```

以上的类型都需要去axios的声明文件中找，位置``demo3/node_modules/axios/index.d.ts``

创建自己的服务类，导入之前的静态配置和自己的类的声明，进行创建对象并且将这个对象导出以便于别的文件进行使用

```typescript
import MasaikkRequest from "./request";

import { BASE_URL, TIME_OUT } from "./request/config";

const masaikkRequest = new MasaikkRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
});

export default masaikkRequest;

```

这里导出的``masaikkRequest``对象就是自己已经实例化的对象，别的文件导入了之后就可以直接调用它的request方法。

然后在main.ts中测试导入的情况：

```typescript
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import masaikkRequest from "./service";

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");

masaikkRequest.request({
  url: "getAudioPath/",
  method: "GET",
});

```

运行整个项目，可以看到导入成功，控制台中有打印res的信息：

![image-20220404122452525](vue.assets/image-20220404122452525.png)

#### axios实例封装

在此也提出一中封装axios实例的方法。

```javascript
import axios from "axios";
const serviceAxios = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 5000,
});

export default serviceAxios;
```

导出这个``serviceAxios``之后就能封装它的各种方法。例如：

```javascript
import serviceAxios from "@/apis/networks";

export const getComments = (params) => {
  return serviceAxios({
    method: "get",
    url: "/user/get_comments/",
    params,
  });
};

export const addCommentById = (params) => {
  return serviceAxios({
    method: "get",
    url: "/user/add_comment/",
    params,
  });
};
```

最后可以在vue组件中导入封装好的方法并使用：

```javascript
getComments({}).then((res) => {
    // res
});
```

#### axios拦截器

提供一种简易的axios拦截器实现方法：

```javascript
import axios from "axios";
const serviceAxios = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 5000,
});

serviceAxios.interceptors.request.use(
  (config) => {
    console.log(config);
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

serviceAxios.interceptors.response.use(
  (res) => {
    console.log(res);
    return res;
  },
  (error) => {
    console.log(error);
  }
);

export default serviceAxios;

```

上面分别使用了请求拦截和响应拦截，并且要特别注意在拦截之后要返回。如``return config;``和``return res;``，否则就没有拦截的意义。

---

### i18n

安装``npm install vue-i18n@9 --save``。

i18n插件支持vue2和vue3，区别在于使用compositionAPI，分别对应于全局的``$t``和``t``。下面对于vue3部分展示。

在main.js中注册：

```js
import { createApp } from "vue";
import App from "./App.vue";
import { createI18n } from "vue-i18n";

const messages = {
  en: {
    message: {
      hello: "hello world",
    },
  },
  ja: {
    message: {
      hello: "こんにちは、世界",
    },
  },
};

// 2. Create i18n instance with options
const i18n = createI18n({
  locale: "ja", // set locale
  fallbackLocale: "en", // set fallback locale
  legacy: false,
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
});
console.log(i18n);
createApp(App).use(i18n).mount("#app");

```

注意要在vue3中使用需要设置对象``legacy: false,``。

对于在每个组件中的导入``import {useI18n} from 'vue-i18n'``；使用``const {t,locale} =useI18n()``

最后在页面中渲染整个句子的操作``{{t('message.hello')}}``

并且可以修改locale.value的属性来修改地区。

示例组件：

```vue
<template>
  <div class="hello">
    {{t('message.hello')}}
    <button @click="changeLang">click</button>
  </div>
</template>

<script>
import {useI18n} from 'vue-i18n'
export default {

  name: 'HelloWorld',
  setup(){
    const {t,locale} =useI18n()
    const changeLang=()=>{
      locale.value='en'
    }
    return{
      t,
      changeLang
    }
  }

}
</script>
```

使用选择栏修改语言的小demo

```vue
<template>
  <div>
    <el-select v-model="langeValue" class="m-2" placeholder="Select" size="small">
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
      />
    </el-select>
    <h3>
      {{t('message.hello')}}
    </h3>
  </div>
</template>

<script>
import {ref, watch} from "vue";
import {useI18n} from 'vue-i18n'

export default {
  name: "ChangeLang",
  setup() {
    const {t, locale} = useI18n()
    const langeValue = ref('en')
    const changeLang = (newLang) => {
      console.log(`设置了新语言${newLang}`);
      locale.value = newLang;
    }
    watch(()=>langeValue.value, (newLang) => {
      changeLang(newLang);
      //监听是否有变化
    })
    const options = [
      {
        value: 'en',
        label: 'en',
      },
      {
        value: 'zh',
        label: 'zh',
      },
      {
        value: 'ja',
        label: 'ja',
      },
    ]
    return {
      t,
      langeValue,
      options
    }
  }
}
</script>
```

![image-20220520213027452](vue.assets/image-20220520213027452.png)

![image-20220520213041576](vue.assets/image-20220520213041576.png)

代码位于``i18ndemo/src/components/ChangeLang.vue``

---

