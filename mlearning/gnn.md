# 图神经网络笔记

代码位于[GNN代码](https://gitee.com/masaikk/tgn)，课程位于[课程](https://www.bilibili.com/video/BV1RU4y1K7iU)

使用pytorch

---

## Graph Embedding

[参考代码](https://github.com/shenweichen/GraphEmbedding)

embedding的五种方法：

+ DeepWalk
+ LINE
+ Node2Vec
+ Struct2Vec
+ SDNE



---

## Graph Neural Network

### GCN

单纯的卷积。不过要注意正则化的两种形式。有$D^{-1}A$得到非对称矩阵和$D^{-\frac{1}{2}}AD^{-\frac{1}{2}}$可以得到对称矩阵。

### GraphSAGE

于GCN的不同点在于，GCN局限于见过的图，而GraphSAGE能够在没见过的节点上进行。而且，GCN是面向全图进行的，GraphSAGE是局部的邻居聚合。

重点在于第K次聚合了K-1次时该节点的特征和第K次该节点邻居的特征（通过一个聚合函数）作为本节点第K次的特征。

![image-20220227233425212](gnn.assets/image-20220227233425212.png)

可以选择最大邻居数，如果真实的邻居超过了数量，就随机选择邻居。如果数量不够，就有些节点多选几遍。

![image-20220227234023764](gnn.assets/image-20220227234023764.png)

上述聚合函数的要求是：

1. 输入的顺序不影响结果。
2. 输入的邻居节点的特征不变，输出的结果也应该不变。

GraphSAGE_minibatch
