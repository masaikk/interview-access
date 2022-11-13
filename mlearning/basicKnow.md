# 机器学习基础知识

可以参考《百面机器学习》的笔记[传送门](../ml.md)

---

## 强化学习

### Q-Learning

首先是最基本的Q-Learning算法，通过每一个state，在根据Reward表来确定一个state的时候，其中这里的Reward是根据实际情况建立的静态表，使用的一个确定的action所对应的reward。在进行一些操作之后，补全Q表。但是这样的缺点在于如果State很多的话，创建一个Q表是不切实际的，所以衍生出了深度Q-Learning网络（DQN）。参考[A Painless Q-learning Tutorial (一个 Q-learning 算法的简明教程)_皮果提的博客-CSDN博客](https://blog.csdn.net/itplus/article/details/9361915)。

---

### DQN

参考[Simple_Reinforcement_Learning/2.双模型_平衡车.ipynb at main · lansinuote/Simple_Reinforcement_Learning · GitHub](https://github.com/lansinuote/Simple_Reinforcement_Learning/blob/main/6.DQN算法/2.双模型_平衡车.ipynb)就是建立一个Q网络，并且使用一个深度神经网络来根据state来计算action。注意，在以上实例代码中使用了model和next_model两个模型用来延迟更新。

```python
def get_value(state, action):
    #使用状态计算出动作的logits
    #[b, 4] -> [b, 2]
    value = model(state)

    #根据实际使用的action取出每一个值
    #这个值就是模型评估的在该状态下,执行动作的分数
    #在执行动作前,显然并不知道会得到的反馈和next_state
    #所以这里不能也不需要考虑next_state和reward
    #[b, 2] -> [b, 1]
    value = value.gather(dim=1, index=action)

    return value

```

以上为使用model来计算action的函数。

```python
def get_target(reward, next_state, over):
    #上面已经把模型认为的状态下执行动作的分数给评估出来了
    #下面使用next_state和reward计算真实的分数
    #针对一个状态,它到底应该多少分,可以使用以往模型积累的经验评估
    #这也是没办法的办法,因为显然没有精确解,这里使用延迟更新的next_model评估

    #使用next_state计算下一个状态的分数
    #[b, 4] -> [b, 2]
    with torch.no_grad():
        target = next_model(next_state)

    #取所有动作中分数最大的
    #[b, 2] -> [b, 1]
    target = target.max(dim=1)[0]
    target = target.reshape(-1, 1)

    #下一个状态的分数乘以一个系数,相当于权重
    target *= 0.98

    #如果next_state已经游戏结束,则next_state的分数是0
    #因为如果下一步已经游戏结束,显然不需要再继续玩下去,也就不需要考虑next_state了.
    #[b, 1] * [b, 1] -> [b, 1]
    target *= (1 - over)

    #加上reward就是最终的分数
    #[b, 1] + [b, 1] -> [b, 1]
    target += reward

    return target

```

以上函数用来计算真实的action，就是使用了next_model。

---

