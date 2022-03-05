# Tensorflow2学习笔记

代码位于[tensorTest: tensorflow2和tensorflow.js的学习代码 (gitee.com)](https://gitee.com/masaikk/tensor-test)

参考自己的keras学习代码[keras代码](https://gitee.com/masaikk/rectr.git)

主要包括tensorflow2和tensorflow.js

运行平台包括anaconda和nodejs。

---

## TensorFlow

### 线性模型

代码位于py/linearTest1.py

类似pytorch，也是使用相似的代码构建的模型

```python
class MyLinear(tf.keras.Model):
    def __init__(self):
        super().__init__()
        self.dense = tf.keras.layers.Dense(
            units=1,
            activation=None,
            kernel_initializer=tf.zeros_initializer(),
            bias_initializer=tf.zeros_initializer()
        )

    def call(self, input):
        out = self.dense(input)
        return out
```

在梯度下降部分略有不同

```python
optim = tf.keras.optimizers.SGD(learning_rate=0.01)
for i in range(100):
    with tf.GradientTape() as tape:
        y_pred = model(X)
        loss = tf.reduce_mean(tf.square(y_pred - Y))
    grads = tape.gradient(loss, model.variables)

    optim.apply_gradients(grads_and_vars=zip(grads, model.variables))
```

*关注tf.GradientTape()*

---

### tf.GradientTape()

tensorflow 提供tf.GradientTape api来实现自动求导功能。只要在tf.GradientTape()上下文中执行的操作，都会被记录与“tape”中，然后tensorflow使用反向自动微分来计算相关操作的梯度。

可训练变量（由tf.Variable或创建tf.compat.v1.get_variable，trainable=True在两种情况下均为默认值）将被自动监视。通过watch在此上下文管理器上调用方法，可以手动监视张量。
**watch的作用是确保`tensor`类型的数据能被梯度带检测到。**

默认情况下，只要调用GradientTape.gradient（）方法，就会释放GradientTape拥有的资源。**也就是说只能用一次！！！**要在同一计算上计算多个梯度，请创建一个持久梯度带。当梯度带回收，释放资源时，这允许多次调用gradient（）方法。

```python
x = tf.constant(3.0)
with tf.GradientTape(persistent=True) as g:
  g.watch(x)
  y = x * x
  z = y * y
dz_dx = g.gradient(z, x)  # 108.0 (4*x^3 at x = 3)
dy_dx = g.gradient(y, x)  # 6.0
del g  # Drop the reference to the tape
```

---

### 多层感知机MLE

代码位于py/MLETest.py

模型代码类似

```python
class MyMLP(tf.keras.Model):
    def __init__(self):
        super().__init__()
        self.flatten = tf.keras.layers.Flatten()  # 这个函数会压缩第一维
        self.dense1 = tf.keras.layers.Dense(units=100, activation=tf.nn.relu)
        self.dense2 = tf.keras.layers.Dense(units=10)

    def call(self, inputs):
        x = self.flatten(inputs)
        x = self.dense1(x)
        x = self.dense2(x)
        out = tf.nn.softmax(x)
        return out
```

使用tf提供的loss

```python
    with tf.GradientTape() as tape:
        y_pred = model(X)
        loss = tf.keras.losses.sparse_categorical_crossentropy(y_true=y, y_pred=y_pred)
        loss = tf.reduce_mean(loss)
        print("batch %d: loss %f" % (batch_index, loss.numpy()))
    grads = tape.gradient(loss, model.variables)
```

使用tf.keras.metrics来评价模型

```python
sparse_categorical_accuracy = tf.keras.metrics.SparseCategoricalAccuracy()
num_batches = int(data_loader.num_test_data // batch_size)
for batch_index in range(num_batches):
    start_index, end_index = batch_index * batch_size, (batch_index + 1) * batch_size
    y_pred = model.predict(data_loader.test_data[start_index: end_index])
    sparse_categorical_accuracy.update_state(y_true=data_loader.test_label[start_index: end_index], y_pred=y_pred)
print("test accuracy: %f" % sparse_categorical_accuracy.result())
```

使用 For 循环迭代分批次传入了测试集数据的预测结果与真实结果，并输出训练后的模型在测试数据集上的准确率。

---

### tensorflow设置

tensorflow默认使用全部的gpu，可以使用此代码来查看当前设备的gpu

```python
    gpus = tf.config.list_physical_devices(device_type='GPU')
    cpus = tf.config.list_physical_devices(device_type='CPU')
```

同时，也可以将一个GPU划分为多个虚拟的GPU

```python
    gpus = tf.config.list_physical_devices(device_type='GPU')
    tf.config.experimental.set_virtual_device_configuration(
        gpus[0],
        [
            tf.config.experimental.VirtualDeviceConfiguration(memory_limit=2048),
            tf.config.experimental.VirtualDeviceConfiguration(memory_limit=2048)
        ]
    )
    my_gpus=tf.config.experimental.list_logical_devices(device_type='GPU')
    print(my_gpus)
```

tensorflow_datasets使用了tensorflow官方的数据集

数据下载到``${USER}\tensorflow_datasets``

通过设置策略来应对一机多卡的情况

```python
	strategy = tf.distribute.MirroredStrategy(devices=[my_gpus[0],my_gpus[1]])

    with strategy.scope():
        model = tf.keras.applications.MobileNetV2(weights=None, classes=2)
        model.compile(
            optimizer=tf.keras.optimizers.Adam(learning_rate=learning_rate),
            loss=tf.keras.losses.sparse_categorical_crossentropy,
            metrics=[tf.keras.metrics.sparse_categorical_accuracy]
        )

    model.fit(dataset, epochs=num_epochs)

```

但是目前还不支持多个虚拟GPU。
