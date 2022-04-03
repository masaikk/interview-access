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

![image-20220314104101717](gnn.assets/image-20220314104101717.png)

想求得a节点的嵌入，看得到有邻居cfj。对于c节点嵌入，根据邻居d和e在第0层的嵌入算得c的邻居嵌入，再通过它自身的嵌入拼接起来算得节点c在第1层的嵌入表示。

### GAT

![image-20220314105005725](gnn.assets/image-20220314105005725.png)

计算两个节点之间的attention系数。对于每个想要求得的$e_{ij}$的值去做归一化的操作。

![image-20220314105452901](gnn.assets/image-20220314105452901.png)

如上图所示，计算i节点余某一个邻居就节点$e^{LeakReLU(e_{ij})}$的值，在把分母算上所有节点这种运算的和，最终得到$a_{ij}$为i节点到j节点的注意力系数。 

---

### RecGNN与ConvGNN的区别

![image-20220323155839268](gnn.assets/image-20220323155839268.png)

RecGNN与ConvGNN的区别在于前者每轮用的参数都是相同的，而卷积每轮的参数都是不同的。

---

### GAE

Graph Auto-Encoder

学习参数Z，编码图，再通过反向操作还原图，将原来的图和得到的还原图之间作比较得到loss。

![image-20220323160645400](gnn.assets/image-20220323160645400.png)

VGAE类似的，形如VAE

![image-20220323160744975](gnn.assets/image-20220323160744975.png)

---

### HGAN

Heterogeneous  Graph Attention Networks

![image-20220323162132447](gnn.assets/image-20220323162132447.png)

通过某个规定的Meta-Path可以将异构图转化为同构图，例如固定“蓝-黄-蓝”为Meta-Path，那么同一个Meta-Path两端的色节点就可以变成邻居，进而转化为此Meta-Path下的同构图:

![image-20220323162847409](gnn.assets/image-20220323162847409.png)

先考虑节点级别的embedding，类似于GAT，先求得某个节点对于它邻居的节点的e，再通过softmax来得到attention系数。

![image-20220323163329355](gnn.assets/image-20220323163329355.png)

$$z^{\Phi_0}_{i}$$表示在$$\Phi_0$$这种Meta-Path下面节点1对于它全部邻居的attention系数相加之后作为节点自身的embedding。

再计算语义级别的attention表示：

![image-20220323164847150](gnn.assets/image-20220323164847150.png)

这里可以看出$$Z_{\Phi_0}$$表示在$$\Phi_0$$这种Meta-Path下面全部的节点的embedding的组合。

![image-20220323194534572](gnn.assets/image-20220323194534572.png)

对于$$Z_{\Phi_0}$$中全部的值进行线性运算在乘以一个可以学习的参数$$q^T$$得到诺干个标量，$$W_{\Phi_0}$$就是对这些标量的平均。

![image-20220323195012225](gnn.assets/image-20220323195012225.png)

再对于$$W_{\Phi_0}$$进行softmax操作得到attention系数$$\beta_{\Phi}$$，再对于同一个节点i来说，将全部的Meta-Path的$$\beta_{\Phi}$$乘以自身的节点特征，最终得到该节点的语义级别的embedding。

![image-20220323200204337](gnn.assets/image-20220323200204337.png)

![image-20220323200247937](gnn.assets/image-20220323200247937.png)

---

### GTN

Graph Transformer Network

![image-20220403225323115](gnn.assets/image-20220403225323115.png)

---

### Edge embedding in Heterogeneous  Graph

如果使用同构图中的embedding方式，比如说随机游走，可能会导致同种节点出现的次数过大。
