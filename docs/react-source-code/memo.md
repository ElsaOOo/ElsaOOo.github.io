---
lang: zh-CN
description: "react 源码解析，react momo"
---

# React.memo

_文章引用请注明出处_

React.memo 是 React 的顶层 API 之一，React.memo 其实是一个高阶组件，它和 React.PureComponent 非常相似，但是**只适用于函数组件**。

如果所用的函数组件在给定相同 props 的情况下渲染相同的结果，这时候可以使用 React.memo，来**记忆**组件渲染结果的方式从而提高组件的性能表现。使用 React.memo，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。

但是，React.memo 仅检查 props 的变更，如果函数组件被`React.memo`包裹，且其实现中拥有`useState`或`useContext`的 hook，当 context 变化时，它仍会重新渲染。

默认情况下其只会**对复杂对象做浅层对比**，如果你想要控制对比过程，那么请将自定义的比较函数通过第二个参数传入来实现。

### 源码

`memo` 的位置在 packages/react/src/memo.js 中

```javascript
export default function memo<Props>(
  type: React$ElementType,
  compare?: (oldProps: Props, newProps: Props) => boolean
) {
  if (__DEV__) {
    // ...
  }
  return {
    $$typeof: REACT_MEMO_TYPE,
    type,
    compare: compare === undefined ? null : compare,
  };
}
```

memo 的定义很简单，传入两个参数，第一个是 React 组件，第二个是一个比较函数，函数参数是旧的 props 和新的 props，返回值是 boolean，如果为 true 表示该组件不需要重新渲染，如果为 false 表示重新渲染该组件。

### 那这个和 React.useMemo 有什么关系呢？

没什么关系！

因为这两个 api 里面都有 memo，我刚开始还以为它们之间有什么联系，但是他两的用处是不同的。

`useMemo` 的源码在 packages/react/src/ReactHooks.js 文件中，

```javascript
export function useMemo(
  create: () => mixed,
  inputs: Array<mixed> | void | null
) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useMemo(create, inputs);
}
```

`useMemo` 函数接收两个参数，第一个参数是一个函数，第二个参数是 使用前一个函数所涉及到的一些依赖项。

`useCallback` 的定义和这个很像：

```javascript
export function useCallback(
  callback: () => mixed,
  inputs: Array<mixed> | void | null
) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useCallback(callback, inputs);
}
```

他俩定义是一样的，但是函数签名有一点不同：

```javascript
useCallback<T>(callback: T, deps: Array<mixed> | void | null): T,
useMemo<T>(nextCreate: () => T, deps: Array<mixed> | void | null): T,
```

`useCallback` 和 `useMemo` 都可缓存函数的引用或值，但从更细的使用角度来说，`useCallback` 缓存函数的引用，`useMemo` 缓存计算数据的值。

### 实例 🌰

```react
// 父组件
const App = () => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };
  const handleClick2 = () => {
    setCount2(count2 + 1);
  };
  return (
    <div className="app">
      <div className="header">Header</div>
      <div className="content">
        <div className="row">
          <div>count1: {count}</div>
          <div>count2: {count2}</div>
          <div>
            <button onClick={handleClick}>count</button>
            <button onClick={handleClick2}>count2</button>
          </div>
          <Child />
        </div>
      </div>
    </div>
  );
};

export default App;

// 子组件
const Child = () => {
  console.log("render child");
  return <div>child</div>;
};

export default React.memo(Child);
```

这里的子组件 Child 如果没有用 React.memo 包裹，那么父组件每一次改变自身的 state，Child 组件都会跟着渲染一次。加上 React.memo 之后，如果没有额外传入 props 的情况下，Child 组件只会渲染第一次，随后父组件自身 state 的改变并不会影响子组件的渲染。、

```react
<Child parentCount={count} />
```

这里的子组件接收父组件的一个 prop，这时候父组件的 count 变量每改变一次子组件也会跟着渲染一次，但是父组件的其他 state 变量的改变不会引起 Child 组件的重新渲染，这里只跟传入子组件的变量相关。 所以尽量子组件用到什么 prop 就传什么 prop，不要用...props 这样的形式把所有的都传给子组件。

但是很多情况下，父组件传给子组件的不会简单就是一个基础类型的值，更多的是一个数组或者一个对象。

```react
const App = () => {
  const [value, setValue] = useState({
    name: "tom",
    age: 20,
  });
  const handleClick = () => {
    setValue((prev) => ({
      ...prev,
      age: prev.age + 1,
    }));
  };
  return (
    <div className="app">
      <div className="header">Header</div>
      <div className="content">
        <div className="row">
          <div>value: {JSON.stringify(value)}</div>
          <div>
            <button onClick={handleClick}>changeValue</button>
          </div>
          <Child parentValue={value} />
        </div>
      </div>
    </div>
  );
};

export default App;
```

这时候每改变一次 value 中的某个属性的值，子组件就会渲染一次，如示例中所示，如果我们想要子组件的渲染和父组件的 age 属性的改变无关的话，我们可以给 React.memo 传入第二个参数，是一个函数：

```javascript
type compare = (oldProps, newProps) => boolean;
```

根据这个 compare 函数的返回值来判断要不要渲染子组件，true 就不渲染，false 就渲染。
