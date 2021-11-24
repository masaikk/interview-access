# 百面机器学习



## 特征工程

### 数据归一化的意义？$\bigstar$

对于两个范围不同的变量来说，把它们的变化范围拉到相似的范围，在梯度下降的时候更容易找到最优解。

### word2vec $\bigstar \bigstar$

分为**CBOW**和**Skip-gram**

CBOW是将上下文的词语来预测当前词，Skip-gram是当前词来预测上下文各词的概率。

softmax公式
$$
P(y=w_n|x)=\frac{e^{x_n}}{\sum\limits_{k=1}^{N}e^{x_{k}}}
$$
一个词为N维原始输入向量
