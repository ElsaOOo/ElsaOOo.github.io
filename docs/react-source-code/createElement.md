---
lang: zh-CN
description: "react 源码解析，react createElement"
---

# React.createElement

_文章引用请注明出处_

我们在 react 项目中写的 jsx 代码经过 babel 编译后会变成普通的 js 代码：

```jsx
<div className="page">
  <Header> Hello, This is React </Header>
  <div>Start to learn right now!</div>
  Right Reserve.
</div>
```

👇 babel 转换

```javascript
React.createElement(
  "div",
  {
    className: "page",
  },
  React.createElement(Header, null, " Hello, This is React "),
  React.createElement("div", null, "Start to learn right now!"),
  "Right Reserve."
);
```

createElement 函数的作用是生成 ReactElement，一个 ReactElement 是一个对象，它主要包含：

```javascript
// $$typeof 属性可以唯一标识一个ReactElement元素
const ReactElement = function (type, key, ref, self, source, owner, props) {
  const element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner,
  };

  return element;
};
```

那 createElement 是在什么时候被执行的呢？

**是 render 函数被调用的时候执行。**

从刚才 babel 转换后的代码中可以看到 Children 类型有 String、原生 DOM 节点的 element、React components (自定义组件的 element)，其他还有 false、null、undefined、number 这些都是 ReactElement，children 类型还可以是一个数组(在 render 中使用 map 的时候)。

所以在调用 creatElement 后得到了 ReactElement 类型的一个对象，接着根据这个对象生成真实的 dom 元素

![image-20200806211946726](../images/createElement.png)

然后直接操作浏览器 DOM 元素，将元素挂载上去。
