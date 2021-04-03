---
lang: zh-CN
description: "react 源码解析，react creatRef react lazy"
---

# React.createRef

这个顶层 API 是帮助我们获取到真实的 dom 元素，它的简单用法：在构造组件时，通常将 Refs 分配给实例属性，这样在整个组件中引用它们。

```react
class MyInput extends PureComponent {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  return (
  	<input ref={inputRef} />
  )
}
```

这样在这个组件 didMount 的时候，我们通过 inputRef.current 就能拿到这个 input 元素的真实 dom 节点了。

它的源码也很简单：

```javascript
// an immutable object with a single mutable value
export function createRef(): RefObject {
  const refObject = {
    current: null,
  };
  if (__DEV__) {
    Object.seal(refObject);
  }
  return refObject;
}
```

作者源码注释写的是这个函数返回一个不变的对象，这个对象有一个可变的 current 属性。

React.createRef 是用在类组件里面的，**不能在函数组件上使用 `ref` 属性，因为它们没有实例**。

不能在函数组件上使用 ref 的意思是：

```react
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.childRef = React.createRef();
  }

  return (
  	// 这样在函数组件上使用createRef是没有作用的
  	<Child ref={this.childRef} />
  )

}

const Child = () => {
  return (
  	<input type="text" />
  )
}
```

如果要在函数组件上使用`ref` ，可以使用`forwardRef` ，或者将该函数组件转换成 class 组件。

在 hooks 中，`useRef`的函数签名是：

```javascript
useRef<T>(initialValue: T): {current: T}
```

和 createRef 的返回值一样，只不过这里多了一个参数，但是这个参数又没有用到。

## React.lazy

```javascript
// lazy接受一个函数，这个函数动态调用import()。返回一个Promise，该Promise需要resolve一个default export的React组件
export function lazy<T, R>(ctor: () => Thenable<T, R>): LazyComponent<T> {
  let lazyType = {
    $$typeof: REACT_LAZY_TYPE,
    _ctor: ctor,
    // React uses these fields to store the result.
    _status: -1,
    _result: null,
  };

  return lazyType;
}
```

🌰：

```react
const OtherComponent = React.lazy(() => import('./OtherComponent'));
```
