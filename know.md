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

