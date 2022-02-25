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
