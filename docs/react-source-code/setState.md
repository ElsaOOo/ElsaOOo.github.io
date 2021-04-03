---
lang: zh-CN
description: "react 源码解析，react setState"
---

# setState 是同步还是异步的？

> **本文用的react版本是 17.0.1**

一般setState是对class components来说的。

看一下基础代码：
```jsx
import React from 'react'

class App extends React.Component {
  state = {
    num: 0,
    text: ''
  }

  handleClick = () => {
    console.log('before', this.state.num);
    this.setState({
      num: this.state.num + 1
    })
    console.log('after', this.state.num);
  }

  render() {
    console.log('render');
    const { num } = this.state;
    return (
      <div>
        <div>{num}</div>
        <div>
          <button onClick={this.handleClick}>加1</button>
        </div>
      </div>
    )
  }
}

export default App;
```

这段代码在控制台中的输出结果是：
```jsx
before 0
after 0
render
```

这里setState是异步的。造成这个的原因是react中有性能优化机制，叫做`batchedUpdates`，从字面意思来看就是批量更新。
比如我们刚才点击按钮触发的click事件中，有多次setState操作，react会将多次setState操作合并为一次更新，这样render就只会执行一次，从而减少不必要的渲染。

### 那么批处理是如何实现的呢？

react源码中
```js
// the renderer. Such as when we're dispatching events or if third party
// libraries need to call batchedUpdates. Eventually, this API will go away when
// everything is batched by default. We'll then have a similar API to opt-out of
// scheduled work and instead do synchronous work.
// Defaults

var batchedUpdatesImpl = function (fn, bookkeeping) {
  return fn(bookkeeping);
};
// 
var isInsideEventHandler = false;
function batchedUpdates(fn, bookkeeping) {
  if (isInsideEventHandler) {
    // If we are currently inside another batch, we need to wait until it
    // fully completes before restoring state.
    return fn(bookkeeping);
  }

  isInsideEventHandler = true;

  try {
    return batchedUpdatesImpl(fn, bookkeeping);
  } finally {
    isInsideEventHandler = false;
    finishEventHandler();
  }
}
```

