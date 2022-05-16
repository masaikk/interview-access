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



