---
lang: zh-CN
description: "js 基本数据类型"
---

# JavaScript 的数据类型

_文章引用请注明出处_

javascript 的数据类型有：

- undefined

- null

- boolean

- string

- Symbol

- number

- object

前 6 种属于基础类型，`基础类型`的数据在被引用或拷贝时是值传递的，也就是说会创建一个完全相等的变量；object 属于`引用类型`，引用类型只是在栈中创建一个指针指向堆内存中原有的变量，实际上两个变量是”共享“这个数据的，并没有重新创建一个新的数据。

这里捡重要的讲一下：

### undefined

undefined 类型数据只有一个值：undefined

以下这些方式可以得到 undefined 值：

- 引用已申明但未初始化的变量

- 引用未定义的对象属性

- 执行无返回值函数

- 执行 void 表达式

- 全局常量 window.undefined 或 undefined

其中推荐用 void 0 来表示 undefined，这样不仅可以少用一个变量或者对象的属性，而且 void 0 是一个表达式，可以用于三目运算符中：

```javascript
let x = 10;
x > 1 ? fn() : void 0;
```

##### 判断一个值是否是 undefined

```javascript
// 1 这个方法不准确，x可能是一个falthy的值
if (!x) {
  //
}

// 2 这个方法是准确的，但是最好先检查x是否已经申明
if (x === undefined) {
}
// 3 这个方法也是准确的，同样的也要检查x是否申明，否则会出现refrenceError
if (typeof x === "undefined") {
}
```

### null

null 类型的值只有一个: null

null 和 undefined 都可以表示空值，当使用 ”==“ 的时候，它们是相等的，但是 null 是 js 的`保留关键字`，而 undefined 只是一个常量。

### number

- NaN(Not a Number) 通常在计算失败的时候会得到该值，要判断一个变量是否为 NaN，可以通过 Number.isNaN 函数来判断。

- Infinity 是无穷大，加上负号 ”-“ 会变成无穷小，在某些场景下比较有用。比如通过数值来表示权重或者优先级，Infinity 可以表示最高优先级或最大权重。

```javascript
// 将10进制转换成其他进制的数，可以用toString()
(10).toString(2); // '1010'

// 精度问题
0.1 + 0.2; // 0.30000000000000004
// 解决精度问题
parseFloat((0.1 + 0.2).toPrecision(12));
```

### Symbol

Symbol 是 ES6 中引入的新数据类型，表示一个唯一的常量

实际举例：

避免常量覆盖

```javascript
const KEY = {
  baidu: "A",
  alibaba: "B",
  // ...
};

function getValue(type) {
  switch (type) {
    case KEY.baidu:
    // ...
    case KEY.alibaba:
    // ...
  }
}

// 这里定义常量KEY属性的值的时候，容易造成值的重复，比如
const KEY = {
  baidu: "A",
  alibaba: "B",
  // ...
  bilibili: "B",
};

// 如果用Symbol作为属性值，就不会出现重复的现象
const KEY = {
  baidu: Symbol(),
  alibaba: Symbol(),
  // ...
  bilibili: Symbol(),
};
// 这里我们只关心键的类型，而不关心属性的值
```

避免对象属性覆盖

```javascript
let o = {
  user: { name: "tom" },
  // ...
};
// 这里的o对象，有很多属性，我们想再往o上添加属性时，为了不覆盖它原有的属性，可以用Symbol得到一个键值
const s = Symbol();
o[s] = 1234;
// 获取这个Symbol属性的值
o[s]; // 1234
```

### Object

简单的说，Object 类型数据就是`键值对的集合`，键是一个字符串(或者 Symbol)，值可以是任意类型的值。

复杂的说，Object 又包括很多子类型，比如 Date，Array，Set，RegExp...

##### 对象的拷贝

由于引用类型在赋值时只传递指针，这种拷贝方式称为`浅拷贝`

而创建一个新的与之相同的引用类型数据的过程称之为`深拷贝`。

```javascript
[undefined, null, true, 0, "", Symbol(), {}].map((it) => typeof it);
// => ["undefined", "object", "boolean", "number", "string", "symbol", "object"];
```

```javascript
const clone = (obj) => {
  // 这里引用es6中的weakMap是为了防止循环引用
  let map = new WeakMap();
  function deep(data) {
    if (typeof data !== "object") {
      return data;
    }
    let result = {};
    const keys = [
      ...Object.getOwnPropertyNames(data),
      ...Object.getOwnPropertySymbols(data),
    ];
    const exist = map.get(data);
    if (exist) {
      return result;
    }
    map.set(data, result);
    for (const key of keys) {
      if (data[key] && typeof data[key] === "object") {
        result[key] = clone(data[key]);
      }
      result[key] = data[key];
    }
    return result;
  }
  return deep(obj);
};

const o1 = { name: "tom" };
const o2 = clone(o1);
console.log(o2); // { name: "tom" }
console.log(o1 === o2); // false
```
