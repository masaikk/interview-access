# react学习笔记

---

## 基本知识

参考[https://gitee.com/react-cp/react-pc-doc/blob/master/1.%E5%9F%BA%E7%A1%80%E6%96%87%E6%A1%A3/react-%E5%9F%BA%E7%A1%80.md](https://gitee.com/react-cp/react-pc-doc/blob/master/1.%E5%9F%BA%E7%A1%80%E6%96%87%E6%A1%A3/react-%E5%9F%BA%E7%A1%80.md)

### 单个组件

渲染根组件到root节点上

```jsx
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

以上``ReactDOM``来自react-dom\client。还可以使用v18之前的react-dom的react-dom用如下方式挂载

```jsx
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
)
```

可以删除严格模式节点

```javascript
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
```

#### 变量使用

使用单个大括号进行变量的使用`{}`，例如

```jsx
const msg = 'masaikk';

function App() {
    return (
        <div className="App">
            {msg}
        </div>
    );
}

export default App;
```

#### 渲染列表

```jsx
const msg = 'masaikk';

const songs = [
    { id: 1, name: '痴心绝对' },
    { id: 2, name: '像我这样的人' },
    { id: 3, name: '南山南' }
]

function App() {
    return (
        <div className="App">
            {msg}
            <ul>
                {
                    songs.map(item => <li>{item.name}</li>)
                }
            </ul>
        </div>
    );
}

export default App;
```

![image-20220516214647371](react.assets/image-20220516214647371.png)

也可以使用forEach方法渲染列表

```jsx
const getForEachList=()=>{
    let list=[];
    songs.forEach((item)=>{
        list.push(<li>{item.name}</li>)
    })
    return list;
}
```

#### 控制内联样式

需要使用到两个大括号``{{}}``进行内联样式的控制，第一个括号表示使用了jsx，第二个括号表示style的对象。例如

```jsx
 <h1 style = {
                {
                    color:"blue"
                }
            }> {msg}</h1>
```

![image-20220516215821192](react.assets/image-20220516215821192.png)

#### 控制类名样式

需要绑定className属性在节点上。

```jsx
const getForEachList=()=>{
    let list=[];
    songs.forEach((item)=>{
        list.push(<li className='my-class1'>{item.name}</li>)
    })
    return list;
}
```

然后写到css文件中

```css
.my-class1{
    color: aqua;
}
```

再在js文件中导入即可

```jsx
import './app.css'
```

![image-20220516220344242](react.assets/image-20220516220344242.png)

#### 函数型组件

```jsx
function Hello(){
    return <div>hello</div>
}

function App() {
  return (
    <div className="App">
        <Hello></Hello>
    </div>
  );
}
```

也可以自闭合的形式``<Hello/>``。组件的名称必须首字母大写，必须要有返回值。

#### 类组件

```jsx
class HelloComponent extends React.Component {
    render() {
        return(
            <div>
                hello component in class definition
            </div>
        )
    }
}
```

首字母必须要大写，继承来自``React.Component``在类中实现render方法，并且有一个返回值。

#### 事件绑定

##### 基本绑定

用``onClick``这种形式来绑定事件。绑定两种组件声明方式的示例代码：

```jsx
import React from "react";

const clickAndMotion = ()=>{
    console.log('clicked');
}

function Hello(){
    return(
        <div onClick={
            clickAndMotion
        }>hello</div>
    )
}

class HelloComponent extends React.Component {
    render() {
        return(
            <div onClick={
                clickAndMotion
            }>
                hello component in class definition
            </div>
        )
    }
}
```

注意要有大括号。

##### 阻止默认事件

使用句柄event对象的preventDefault()可以阻止默认事件的触发。

```jsx
class MyATag1 extends React.Component {
    aTagMethod=(e)=>{
        e.preventDefault();
        console.log('默认事件被阻止了');
    }

    render() {
        return(
            <a onClick={
                this.aTagMethod
            } href = 'http://masaikk.xyz'>
                a标签,但是被阻止了默认事件
            </a>
        )
    }
}
```

![image-20220517120449880](react.assets/image-20220517120449880.png)

##### 传递更多参数

必须改成箭头函数调用的形式，如下：

```jsx
function Hello(){
    const saySome = (msg) => {
        console.log(msg);
    }
    return(
        <div onClick={
            ()=>{
                saySome('my information')
            }
        }>hello</div>
    )
}
```

这样的形式然后还想操作event句柄的话就需要指定箭头函数的参数：

```jsx
function Hello(){
    const saySome = (msg,e) => {
        console.log(msg);
    }
    const checkEvent=(e)=>{
        e.preventDefault();
    }
    return(
        <a href='http://www.masaikk.xyz' onClick={
            (e)=>{
                saySome('my information');
                checkEvent(e)
            }
        }>hello</a>
    )
}
```

##### 组件状态

在没有hook之前，函数组件是没有状态的。

修改状态要使用setState方法来进行。

```jsx
state = {
        msg: 'this is a message',
        counter: 0
    }
addCount = () => {
        this.setState({
            counter: this.state.counter + 1
        })
    }
```

这里的``state``的名字是固定的。

完整的组件例子，并且在jsx中要注意this的指向问题

```jsx
class HelloComponent extends React.Component {
    state = {
        msg: 'this is a message',
        counter: 0
    }
    addCount = () => {
        this.setState({
            counter: this.state.counter + 1
        })
    }

    render() {
        return (
            <>
                <h3>
                    {this.state.msg}
                </h3>
                <div onClick={
                    clickAndMotion
                }>
                    hello component in class definition and the count is {this.state.counter}
                </div>
                <button onClick={this.addCount}>add count</button>
            </>

        )
    }
}
```

不同于vue的响应式，在react中对于state中不同的数据结构的修改药使用setState，参考：

```jsx
state = {
  count : 0,
  list: [1,2,3],
  person: {
     name:'jack',
     age:18
  }
}
```

示例的修改代码：

```jsx
this.setState({
    count: this.state.count + 1
    list: [...this.state.list, 4],
    person: {
       ...this.state.person,
       // 覆盖原来的属性 就可以达到修改对象中属性的目的
       name: 'rose'
    }
})
```

##### react组件中的this问题

因为this的问题，所以建议在类定义中使用箭头函数添加方法。

或者在构造函数中使用bind的方法绑定函数到this上。

##### 绑定表单数据

参考vue中的双向绑定。

```jsx
class InputComponent extends React.Component {
    // 声明组件状态
    state = {
        message: 'this is message',
    }
    // 声明事件回调函数
    changeHandler = (e) => {
        this.setState({ message: e.target.value })
    }
    render () {
        return (
            <div>
                {/* 绑定value 绑定事件*/}
                <input value={this.state.message} onChange={this.changeHandler} />
            </div>
        )
    }
}
```

##### 使用ref操作非受控组件

非受控组件相比于上述绑定表单数据到state中的受控组件的区别是，这里操作ref来使用手动来操作dom节点。

