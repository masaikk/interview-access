# 杂项知识

pytorch的unsqueeze和squeeze方法，分别对张量进行升维和降维，链接如：

https://zhuanlan.zhihu.com/p/86763381

```python
import torch

x = torch.Tensor([1, 2, 3, 4])  # torch.Tensor是默认的tensor类型（torch.FlaotTensor）的简称。

print('-' * 50)
print(x)  # tensor([1., 2., 3., 4.])
print(x.size())  # torch.Size([4])
print(x.dim())  # 1
print(x.numpy())  # [1. 2. 3. 4.]

print('-' * 50)
print(torch.unsqueeze(x, 0))  # tensor([[1., 2., 3., 4.]])
print(torch.unsqueeze(x, 0).size())  # torch.Size([1, 4])
print(torch.unsqueeze(x, 0).dim())  # 2
print(torch.unsqueeze(x, 0).numpy())  # [[1. 2. 3. 4.]]

print('-' * 50)
print(torch.unsqueeze(x, 1))
# tensor([[1.],
#         [2.],
#         [3.],
#         [4.]])
print(torch.unsqueeze(x, 1).size())  # torch.Size([4, 1])
print(torch.unsqueeze(x, 1).dim())  # 2

print('-' * 50)
print(torch.unsqueeze(x, -1))
# tensor([[1.],
#         [2.],
#         [3.],
#         [4.]])
print(torch.unsqueeze(x, -1).size())  # torch.Size([4, 1])
print(torch.unsqueeze(x, -1).dim())  # 2

print('-' * 50)
print(torch.unsqueeze(x, -2))  # tensor([[1., 2., 3., 4.]])
print(torch.unsqueeze(x, -2).size())  # torch.Size([1, 4])
print(torch.unsqueeze(x, -2).dim())  # 2
```

以及对于某一个维度上的压缩操作，使用squeeze()方法

```python
print("*" * 50)

m = torch.zeros(2, 1, 2, 1, 2)
print(m.size())  # torch.Size([2, 1, 2, 1, 2])

n = torch.squeeze(m)
print(n.size())  # torch.Size([2, 2, 2])

n = torch.squeeze(m, 0)  # 当给定dim时，那么挤压操作只在给定维度上
print(n.size())  # torch.Size([2, 1, 2, 1, 2])

n = torch.squeeze(m, 1)
print(n.size())  # torch.Size([2, 2, 1, 2])

n = torch.squeeze(m, 2)
print(n.size())  # torch.Size([2, 1, 2, 1, 2])

n = torch.squeeze(m, 3)
print(n.size())  # torch.Size([2, 1, 2, 2])

print("@" * 50)
p = torch.zeros(2, 1, 1)
print(p)
# tensor([[[0.]],
#         [[0.]]])
print(p.numpy())
# [[[0.]]
#  [[0.]]]

print(p.size())
# torch.Size([2, 1, 1])

q = torch.squeeze(p)
print(q)
# tensor([0., 0.])

print(q.numpy())
# [0. 0.]

print(q.size())
# torch.Size([2])


print(torch.zeros(3, 2).numpy())
# [[0. 0.]
#  [0. 0.]
#  [0. 0.]]
```

---

C++的进程fork问题

文档代码位于https://juejin.cn/post/6912612368996368392

代码位于根目录下的code/cpp/other中，注意cmakelists文件

**感觉cmake的知识与写法之后都应该找找机会去补补。**

![image-20220102155548317](know.assets/image-20220102155548317.png)

对于fork函数来说，对于父进程和子进程都分别有一次返回。

使用的代码如下所示：

```c++
#include <unistd.h>
#include <stdio.h>


int main(){
    // 创建进程
    pid_t pid = fork();

    // 判断当前进程是父进程 还是子进程
    if (pid > 0){			// 进程号 > 0，即为子进程的进程号，当前为父进程
        printf("pid: %d\n", pid);
        printf("I am parent process, pid: %d, ppid: %d\n", getpid(), getppid());
    }
    else if (pid == 0){		// 进程号 == 0，表示当前为子进程
        printf("I am child process, pid: %d, ppid: %d\n", getpid(), getppid());
    }

    for (int i = 0; i < 5; i++){
        printf("pid: %d, i : %d\n", getpid(), i);
        sleep(1);
    }
    return 0;
}
```

进程之间的变量不会互相影响

![image-20220102162315104](know.assets/image-20220102162315104.png)

代码如下:

```c++
    // 创建进程
    pid_t pid = fork();

    // 局部变量
    int num = 10;

    // 判断当前进程是父进程 还是子进程
    if (pid > 0){			// 进程号 > 0，即为子进程的进程号，当前为父进程
        printf("I am parent process, pid: %d, ppid: %d\n", getpid(), getppid());

        printf("parent process num : %d\n", num);
        num += 10;
        printf("parent process num + 10 : %d\n", num);

    }
    else if (pid == 0){		// 进程号 == 0，表示当前为子进程
        printf("I am child process, pid: %d, ppid: %d\n", getpid(), getppid());

        printf("child process num : %d\n", num);
        num += 100;
        printf("child process num + 100 : %d\n", num);
    }
```

---

JavaScript的严格模式 [JS 必须知道的基础《严格模式 'use strict'》 - 掘金 (juejin.cn)](https://juejin.cn/post/6844904120214618120)

对于变量

+ 不允许意外创建全局变量

+ 不能使用 `delete` 操作符删除声明变量

+ 不用使用保留字（例如 ：implements、interface、let、package、 private、protected、public、static 和 yield 标识符）作为变量

对于对象

+ 为只读属性赋值会抛出TypeError

+ 对不可配置的（nonconfigurable）的属性使用 delete 操作符会抛出TypeError

+ 为不可扩展的（nonextensible）的对象添加属性会抛出TypeError

  + ```javascript
    Object.preventExtensions({});
    ```

+ 使用对象字面量时, 属性名必须唯一

this指向

+ 全局作用域的函数中的this不再指向全局而是undefined。

+ 如果使用构造函数时，如果忘了加new，this不再指向全局对象，而是undefined报错

其余的看以上链接。

---

cmakelist

```cmake
set(CMAKE_CXX_FLAGS "-march=native -o3")
set(CMAKE_BUILD_TYPE "release")
```

优化模式只有在CMAKE_BUILD_TYPE为release的时候才生效

```cmake
add_executable(interview
        code/cpp/other/cm.cpp
        code/cpp/other/cm.h)add_executable
```

链接编译至可执行文件。第一行是生成的二进制文件名，后面是代码文件

---

WGAN

- 判别器最后一层去掉sigmoid
- 生成器和判别器的loss不取log
- 每次更新判别器的参数之后把它们的绝对值截断到不超过一个固定常数c
- 不要用基于动量的优化算法（包括momentum和Adam），推荐RMSProp，SGD也行

---

webpack $\bigstar$

这里位于Vue3视频的第六集。是cli的基础，在此记录代码，相当于对于之前学习的复习。

代码仓库位于 [wbpk: webpack studying (gitee.com)](https://gitee.com/masaikk/wbpk)

webpack 的基本配置的入口是位于当前目录下面src文件夹下面的index.js

默认的输出文件是在dist文件下面的。

注意：如果是使用webpack.config.js来配置文件的话，对于输出的文件，需要使用绝对路径。这也建议搭配node的path库来使用。例如：

```javascript
const path = require('path')
module.exports = {
   // 入口文件
    entry: './src/index.js',
    // 输出文件
    output: {
        filename: 'build/bundle.js',
        path: path.resolve(__dirname, 'dist')
    }, 
}
```

注意，出现报错*Uncaught TypeError: Cannot read properties of null (reading 'appendChild')*这里表示body节点还没创建出来就引用了这个js文件。应该让它在body节点中被包含。

创建一个实例的js文件，生成一个节点并且加入到body中。如下：

```javascript
const eleDiv=document.createElement('div');
eleDiv.className='cls';
eleDiv.innerHTML="Webpack";

document.body.appendChild(eleDiv);
```

在index.js文件中，可以通过这样的代码引入：

```javascript
import './out'
```

然后，实际上引入由webpack打包的代码的写法应该这样表示，应该写在body节点中间：

```javascript
<head>
    <meta charset="UTF-8">
    <title>index</title>
</head>
<body>
<script src="./build/bundle.js"></script>
</body>
```

能在页面中显示

![image-20220123193846735](C:/Users/masaikk/Desktop/interview-access/know.assets/image-20220123193846735.png)
