# Python数据挖掘

---

代码位于：https://gitee.com/masaikk/data-deep-mear-exercise.git

---

## 第二章 矩阵向量和多维数组

2.4 索引

```py
A=np.linspace(0,1,11)
A>0.5
```

输出

![image-20211207114342505](pymear.assets/image-20211207114342505.png)



2.5 调整大小和形状

```python
import numpy as np

data = np.arange(5)
# 将numpy数组合并
print(data)
print(np.vstack((data, data, data)))
```

输出为：![image-20211209125410253](pymear.assets/image-20211209125410253.png)

可以通过以下代码将一个numpy数组转化成列形式的：

```py
data=data[:,np.newaxis]
```

![image-20211209125617550](pymear.assets/image-20211209125617550.png)

可以将numpy数组从列的方向上合并：

```py
np.hstack((data,data,data))
```

**注意上述两种的合并的方式需要传入元组。**

![image-20211209125947070](pymear.assets/image-20211209125947070.png)

2.6 numpy数组的元素操作

原始数据为：

![image-20211209130455245](pymear.assets/image-20211209130455245.png)

分别进行整体的求和，行上的求和和列上的求和，结果如下：

![image-20211209130704412](pymear.assets/image-20211209130704412.png)

在第二个数组里面找第一个数组的元素，并且返回布尔值：

![image-20211210092612319](pymear.assets/image-20211210092612319.png)

## 第三章 符号计算

sympy用于解析计算和符号计算

注意：**numpy.pi和sympy.pi不能混用**

P69 过于深奥我无法理解，暂时跳过



## 第四章 绘图和可视化

![image-20211210095713794](pymear.assets/image-20211210095713794.png)
