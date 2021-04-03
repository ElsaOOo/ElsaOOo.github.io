---
description: "ts typescript 泛型"
---

# TypeScript 泛型应用(一)

> TypeScript 泛型简单来说就是一个接口的类型定义的时候不确定是什么类型，在使用的时候才去赋予它确定的类型，这就使得这个接口具有复用性。

接下来通过几个实际的例子 🌰 来说明一下它的应用场景。

```ts
// 获取一个number类型的数组
const makeNumArr = (val: number) => [val];

// 获取一个字符串数组
const makeStrArr = (val: string) => [val];
```

在上面的示例中，我们通过参数类型的限制来得到返回值的类型，这样参数的类型一变化，就要新写一个函数，很不复用。我们想要的是编译时根据参数类型就得到对应的返回值类型，这时候就要用到泛型了。

```ts
// 在函数前面加上<T> 表示这个函数接收一个泛型参数
const makeArr = <T>(val: T) => [val];

// 在使用的时候，如果参数是一个number类型，ts自动推导出返回值类型是number[];
// 在使用的时候，如果参数是一个string类型，ts自动推导出返回值类型是string[];
const numberArr = makeArr(1);
const stringArr = makeArr("hello");
```

或者我们可以给一个泛型函数定义一个接口类型，根据这个接口类型可以生成不用类型的函数

```ts
interface GenericArr<T> {
  (val: T): T[];
}
const makeArr = <T>(val: T) => [val];
// 得到一个限制输入参数为number的函数
let makeNumberArr: GenericArr<number> = makeArr;
// 得到一个限制输入参数为string的函数
let makeStringArr: GenericArr<string> = makeArr;
const numberArr = makeNumberArr(1);
const stringArr = makeStringArr("hello");
```

<br>
<br>

---

### 泛型 extends

有这样一种场景，在使用函数的时候，我们传参是一个对象，但是我们可能只对这个参数的几个字段做处理，其他字段不变。

```ts
const makeFullName = (obj) => ({
  ...obj,
  fullName: `${obj.firstname} ${obj.lastname}`,
});

// 这里对obj的类型约束就是
const makeFullName = (obj: { firstname: string; lastname: string }) => ({
  ...obj,
  fullName: `${obj.firstname} ${obj.lastname}`,
});

// 但是我们传入的参数可能不止两个字段，还包含一些其他的字段
const res = makeFullName({ firstname: "mary", lastname: "sun", age: 20 });

// 这里编译器就会提示我们age这个字段不在{ firstname: string; lastname: string } 这个类型中。这种情况可以有两种处理方式
// 第一种是把传的参数提前以一个变量的形式定义
const obj1 = {
  firstname: "mary",
  lastname: "sun",
  age: 20,
};
// 这种情况就不会报编译错误
const res2 = makeFullName(obj1);
// 第二种是给这个函数添加泛型参数
const makeFullName2 = <T extends { firstname: string; lastname: string }>(
  obj: T
) => ({
  ...obj,
  fullName: `${obj.firstname} ${obj.lastname}`,
});
// 然后再以内联参数的形式传参，也不会报编译错误了
const res3 = makeFullName2({
  firstname: "mary",
  lastname: "sun",
  age: 20,
});
```

在 React 项目中，用到泛型的地方也很多，比如组件的 Props 和 State 就是一个泛型。取一个比较常见的 🌰。

```tsx
<!-- APP.tsx -->
import React, {useState} from "react";
import { render } from 'react-dom';

interface HelloWorldProps {
  name: string;
}
const HelloWorld: React.FC<HelloWorldProps> = ({name}) => {
  const  [state] = useState<{name: string}>({name: ''})
  return (
  <div>hello {name}</div>
)
}

interface FormProps<T> {
  values: T;
  children: (values: T) => React.ReactNode;
}
const Form = <T extends {}>({values, children}: FormProps<T>) => {
  return children(values)
}

const App = () => (
  <div id="root">
    <HelloWorld />
    <Form values={{firstName: 'bob'}}>
      {(values) => <div>{values.firstName}</div>}
    </Form>
  </div>
)

render(
  <App />,
  document.getElementById('root')
);
```
