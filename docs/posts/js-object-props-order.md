---
description: "js 中的对象属性有顺序么？"
---

# js 中的对象属性有顺序么？

最近在修一个 bug 的时候发现，一个 js 对象数组经过`Lodash`的 groupBy 方法后，输出的对象属性顺序发生了变化。

虽然`Lodash`的官方文档是这么写的：

> The order of grouped values is determined by the order they occur in `collection`

但实际情况是：

```javascript
const rawData = [
  {
    value: 1,
    group: "分组一",
  },
  {
    value: 2,
    group: "0",
  },
  {
    value: 3,
    group: "分组二",
  },
];
const groupedData = _.groupBy(rawData, "group");
```

我期望按照顺序输出，是这样的：

```javascript
const groupedData = {
  分组一: {
    value: 1,
    group: "分组一",
  },
  0: {
    value: 2,
    group: "0",
  },
  分组二: {
    value: 3,
    group: "分组二",
  },
};
```

但实际的输出结果是：

```javascript
const groupedData = {
  0: {
    value: 2,
    group: "0",
  },
  分组一: {
    value: 1,
    group: "分组一",
  },
  分组二: {
    value: 3,
    group: "分组二",
  },
};
```

groupBy 之后的对象属性排序了。但实际情况是就算不用 lodash 的 groupBy 方法，js 的对象属性也会出现这样的情况。

那 js 的对象属性可能是按照某种顺序排序的？

我们可以在控制台里试一下：

```javascript
let a = { b: "1", 1: "nn", 测试: "test" };
// 输出 {1: "nn", b: "1", 测试: "test"}

let b = { 测试: "test", 1: "nn", b: "1" };
// 输出 {1: "nn", 测试: "test", b: "1"}
```

果然看起来是有顺序的。那这样的话，是按照什么顺序排的呢？

按照例子中的结果，对象属性先按数字型的排序，再是非数字型的属性。

如果属性中既存在数字型的属性，又存在对应字符型的属性，那么后出现的会覆盖之前出现的。

```javascript
let a = { b: "1", 1: "nn", 测试: "test", 1: "mm" };
// 输出 {1: "mm", b: "1", 测试: "test"}
```

结合网上网友得出以下结论：

> Chrome 等新版浏览器 JS 引擎遵循新版 ECMA-262 5th,使用 for-in 语句遍历对象属性时遍历书序并非属性构建顺序。而 IE6、7、8 等旧版本浏览器的 JS 解析引擎遵循的是较老的 ECMA-262 3rd，属性遍历顺序由属性构建的顺序决定。Chrome 的 JS 引擎遍历对象属性时会遵循一个规律：**它们会先提取所有 key 的 parseFloat 值为非负整数的属性，然后根据数字顺序对属性排序首先遍历出来，然后按照对象定义的顺序遍历余下的所有属性。**
