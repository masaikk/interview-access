# Tensorflow2学习笔记

代码位于[tensorTest: tensorflow2和tensorflow.js的学习代码 (gitee.com)](https://gitee.com/masaikk/tensor-test)

参考自己的keras学习代码[keras代码](https://gitee.com/masaikk/rectr.git)

主要包括tensorflow2、tensorflow.js和TFX

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

---

### model

如果我们需要在训练和预测时实现不同的行为，可以在model的`call`方法中加入一个布尔类型的值`training`，当训练时这个参数值为`True`，进行评估或者预测时(非训练行为)，这个参数值为`False`。





---

## TensorFlowJS

使用了typescript和"@tensorflow/tfjs-node": "^3.15.0"，代码位于``ts-node/src/index.ts``，使用prettier作为代码格式化工具。使用nodemon作为监听的包。

参考API[TensorFlow.js API](https://js.tensorflow.org/api/latest/?hl=zh-cn)

参考package.json文件如下：

```json
{
  "name": "ts-node",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "watch": "tsc --watch",
    "start": "nodemon ./dist",
    "http-server": "http-server ."
  },
  "keywords": [
    "tfjs"
  ],
  "author": "masaikk",
  "license": "ISC",
  "dependencies": {
    "@tensorflow/tfjs-node": "^3.15.0",
    "@types/node": "^17.0.23",
    "http-server": "^14.1.0",
    "nodemon": "^2.0.15",
    "typescript": "^4.6.3"
  },
  "devDependencies": {
    "prettier": "^2.6.2"
  }
}
```

---

简要的示例代码检查npm是否安装成功

```typescript
import * as tf from "@tensorflow/tfjs-node";
import type { Sequential, Tensor2D, Tensor } from "@tensorflow/tfjs-node";
import { model } from "./testapis";

let verbose: boolean = false;

// Create a rank-2 tensor (matrix) matrix tensor from a multidimensional array.
const a: Tensor = tf.tensor([
  [1, 2],
  [3, 4],
]);
console.log("shape:", a.shape);
// a.print();

// Or you can create a tensor from a flat array and specify a shape.
const shape = [2, 2];
const b: Tensor = tf.tensor([1, 2, 3, 101], shape);
console.log("shape:", b.shape);
// b.print();

const c: Tensor = tf.add(a, b);

c.print(verbose);
```

---

### 使用数据集

使用dataset来导入csv文件，要注意的是读取操作是返回promise。

可以使用http-server来当本地的数据服务器。

导入使用如下代码

```typescript
import * as tf from "@tensorflow/tfjs-node";
import { CSVDataset } from "@tensorflow/tfjs-data/dist/datasets/csv_dataset";

const houseScaleData: CSVDataset = tf.data.csv(
  "http://127.0.0.1:8080/src/testapis/dataset/kc_house_data.csv"
);
const data = houseScaleData.take(10);
// 获取前十行

export { houseScaleData, data };
```

注意index.ts中的异步函数操作

```typescript
import * as tf from "@tensorflow/tfjs-node";
import type { Sequential, Tensor2D, Tensor } from "@tensorflow/tfjs-node";
import { houseScaleData, data } from "./testapis";

async function run() {
  const data10 = await houseScaleData.take(10).toArray();
  console.log(data10);
}

run();
```

可以使用对象数组的map方法来遍历，*不过这里我碰到了一些问题，必须要把map对象设置为any。*疑似代码：

```typescript
import * as tf from "@tensorflow/tfjs-node";
import type { Sequential, Tensor2D, Tensor } from "@tensorflow/tfjs-node";
import { houseScaleData, data } from "./testapis";

async function run() {
  const data10 = houseScaleData.take(10);
  const data10Objs = await data10.toArray();

  const points: any[] = data10Objs.map((record: any) => {
    // console.log(record);
    let sqft_living: number = record.sqft_living;
    let price: number = record.price;

    // console.log(typeof record);
    return Object({
      x: sqft_living,
      y: price,
    });
  });

  const featureValues = points.map((p) => p.x);
  const featureTensor: Tensor2D = tf.tensor2d(featureValues, [
    featureValues.length,
    1,
  ]);

  const labelValues = points.map((p) => p.y);
  const labelTensor: Tensor2D = tf.tensor2d(labelValues, [
    labelValues.length,
    1,
  ]);

  featureTensor.print();
  labelTensor.print();
}

run();

```

加上point接口的定义，注意``number``与``Number``区别：

```typescript
import * as tf from "@tensorflow/tfjs-node";
import type { Sequential, Tensor2D, Tensor } from "@tensorflow/tfjs-node";
import { houseScaleData, data } from "./testapis";

interface point {
  x: number;
  y: number;
}

async function run() {
  const data10 = houseScaleData.take(10);

  const points: point[] = (await houseScaleData.toArray()).map(
    (record: any) => {
      let sqft_living: number = record.sqft_living;
      let price: number = record.price;
      return Object({
        x: sqft_living,
        y: price,
      });
    }
  );

  const featureValues = points.map((p) => p.x);
  const featureTensor: Tensor2D = tf.tensor2d(featureValues, [
    featureValues.length,
    1,
  ]);

  const labelValues = points.map((p) => p.y);
  const labelTensor: Tensor2D = tf.tensor2d(labelValues, [
    labelValues.length,
    1,
  ]);

  featureTensor.print();
  labelTensor.print();
}

run();

```

### 正则化

在``ts-node/src/testapis/utils/TensorUtils.ts``中定义正则化函数``normalise``并导出。

```typescript
import type { Tensor } from "@tensorflow/tfjs-node";

function normalise(tensor: Tensor): Tensor {
  const min: Tensor = tensor.min();
  const max: Tensor = tensor.max();
  const normalisedTensor: Tensor = tensor.sub(min).div(max.sub(min));
  return normalisedTensor;
}

export { normalise };
```

定义``denormalise``函数并导出

```typescript
function denormalise(tensor: Tensor, min: Tensor, max: Tensor): Tensor {
  const denomalisedTensor: Tensor = tensor.mul(max.sub(min)).add(min);
  return denomalisedTensor;
}
```

### 切分数据集

使用``tf.split``方法。需要注意的是这里需要考虑切分的原始数据是否可以划分完否则会报错。

示例代码

```typescript
  const [trainNormalisedFeatureTensor, testNormalisedFeatureTensor]: Tensor[] =
    tf.split(normalisedFeature.tensor, 2, 0);
```

这里表示切成两份并且从第零维开始切分。

### 创建模型

以线性回归为例，使用``const model: Sequential = tf.sequential();``

示例代码

```typescript
import * as tf from "@tensorflow/tfjs-node";
import type { Sequential } from "@tensorflow/tfjs-node";

function createModel(): Sequential {
  const model: Sequential = tf.sequential();
  model.add(
    tf.layers.dense({
      units: 1,
      useBias: true,
      activation: "linear",
      inputDim: 1,
    })
  );

  return model;
}

export { createModel };

```

参考``ts-node/src/testapis/models/LinearModel.ts``

参看model的基本信息

```typescript
const model: Sequential = createModel();
  model.summary();
```

```shell
__________________________________________________________________________________________
Layer (type)                Input Shape               Output shape              Param #   
==========================================================================================
dense_Dense1 (Dense)        [[null,1]]                [null,1]                  2         
==========================================================================================
Total params: 2
Trainable params: 2
Non-trainable params: 0
__________________________________________________________________________________________
```

考虑对于model添加compile选项以规定训练的方法：

```typescript
  const optim: tf.SGDOptimizer = tf.train.sgd(0.1);

  model.compile({
    loss: "meanSquaredError",
    optimizer: optim,
  });
```

### 训练模型

#### 训练

使用``model.fit()``方法，比如：

```typescript
async function trainModel(
  model: Sequential,
  trainingFeatureTensor: Tensor,
  trainingLabelTensor: Tensor
): Promise<void> {
  model.fit(trainingFeatureTensor, trainingLabelTensor);
}
```

这里的fit方法可以添加更多的选择，比如说epoch和回调函数。

```typescript
model.fit(trainingFeatureTensor, trainingLabelTensor, {
    epochs: 20,
    callbacks: {
      onEpochEnd: (epoch: number, log: Logs | undefined) => {
        console.log(`Epoch ${epoch} with loss: ${(log as Logs).loss}`);
      },
    },
  });
```

注意``model.fit()``方法是异步的。所以以上定义的``trainModel()``方法也是异步的。

参考代码位于``ts-node/src/testapis/models/modelHandler.ts``。

#### 返回值

参考返回的对象``tf.History``

```typescript
export declare class History extends BaseCallback {
    epoch: number[];
    history: {
        [key: string]: Array<number | Tensor>;
    };
    onTrainBegin(logs?: UnresolvedLogs): Promise<void>;
    onEpochEnd(epoch: number, logs?: UnresolvedLogs): Promise<void>;
    /**
     * Await the values of all losses and metrics.
     */
    syncData(): Promise<void>;
}
```

#### 验证

添加验证集的比例

```typescript
async function trainModel(
  model: Sequential,
  trainingFeatureTensor: Tensor,
  trainingLabelTensor: Tensor
): Promise<History> {
  return model.fit(trainingFeatureTensor, trainingLabelTensor, {
    batchSize: 32,
    epochs: 20,
    validationSplit: 0.2,
    callbacks: {
      onEpochEnd: (epoch: number, log: Logs | undefined) => {
        console.log(`Epoch ${epoch} with loss: ${(log as Logs).loss}`);
      },
    },
  });
}
```

### 测试模型

#### 评估

使用``model.evaluate()``方法进行评估。

```typescript
  const lossTensor: tf.Scalar | tf.Scalar[] = model.evaluate(
    testNormalisedFeatureTensor,
    testNormalisedLabelTensor
  );
  const loss: Uint8Array | Int32Array | Float32Array = (
    lossTensor as tf.Scalar
  ).dataSync();
  console.log("testing loss: " + loss);
```

### 保存模型

```typescript
const saveResults: io.SaveResult = await model.save(
              "file://./save_model/model-3"
            );
```



---

## TensorFlow Extended(TFX)



## TensorFlow Serving

