---
lang: zh-CN
description: "react-router 源码解析"
---

# react-router 源码阅读

在react单页应用中，react-router是必不可少的一个依赖。
ReactTraining/react-router   react-router的仓库是以monorepo的方式管理包的，在这个仓库里面同时包含有react-router、react-router-dom、react-router-native、react-router-config这四个包，其中react-router是核心包， react-router-dom、react-router-native都依赖于它。这里只看react-router和react-router-dom这两样。   


在项目中，我们都是从react-router-dom引用路由相关组件的，所以从react-router-dom入手。
我们以一段最简单的代码开始：

```jsx
import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

const Home = () => <div>home</div>
const Articles = () => <div>articles</div>
const About = () => <div>about</div>


const App = () => (
  <div>
    <Router>
      <div>
        <Link to="/" style={{marginRight: '10px'}}>home</Link>
        <Link to="/articles" style={{marginRight: '10px'}}>articles</Link>
        <Link to="/about">about</Link>
      </div>
      <Switch>
        <Route path="/" exact children={Home}></Route>
        <Route path="/articles" children={Articles}></Route>
        <Route path="/about" children={About}></Route>
      </Switch>
    </Router>
  </div>
)

export default App;
```

首先看一下从react-router-dom引用的BrowserRouter:
```jsx
// packages/react-router-dom/modules/BrowserRouter.js
import React from "react";
import { Router } from "react-router";
import { createBrowserHistory as createHistory } from "history";
import PropTypes from "prop-types";
import warning from "tiny-warning";

/**
 * The public API for a <Router> that uses HTML5 history.
 */
class BrowserRouter extends React.Component {
  history = createHistory(this.props);

  render() {
    return <Router history={this.history} children={this.props.children} />;
  }
}
export default BrowserRouter;
```

react-router-dom中的BrowserRouter，其实就是对react-router中的Router组件做了一层封装，传入了history和children prop。
看一下react-router中的Router组件：
```jsx
import React from "react";
import PropTypes from "prop-types";
import warning from "tiny-warning";

import HistoryContext from "./HistoryContext.js";
import RouterContext from "./RouterContext.js";

/**
 * The public API for putting history on context.
   Router就是记录路由状态的context
 */
class Router extends React.Component {
  static computeRootMatch(pathname) {
    return { path: "/", url: "/", params: {}, isExact: pathname === "/" };
  }

  constructor(props) {
    super(props);

    this.state = {
      location: props.history.location
    };

    // This is a bit of a hack. We have to start listening for location
    // changes here in the constructor in case there are any <Redirect>s
    // on the initial render. If there are, they will replace/push when
    // they mount and since cDM fires in children before parents, we may
    // get a new location before the <Router> is mounted.
    this._isMounted = false;
    this._pendingLocation = null;

    if (!props.staticContext) {
      this.unlisten = props.history.listen(location => {
        // 这里监听location的变化，一旦location发生变化，Router组件重新渲染。
        // 使用RouterContext和HistoryContext的组件也就跟着重新渲染
        if (this._isMounted) {
          this.setState({ location });
        } else {
          this._pendingLocation = location;
        }
      });
    }
  }

  componentDidMount() {
    this._isMounted = true;

    if (this._pendingLocation) {
      this.setState({ location: this._pendingLocation });
    }
  }

  componentWillUnmount() {
    if (this.unlisten) {
      // 解除路由变化监听
      this.unlisten();
      this._isMounted = false;
      this._pendingLocation = null;
    }
  }

  render() {
    return (
      <RouterContext.Provider
        value={{
          history: this.props.history,
          // location， 总是最新的location
          location: this.state.location,
          match: Router.computeRootMatch(this.state.location.pathname),
          staticContext: this.props.staticContext
        }}
      >
        <HistoryContext.Provider
          children={this.props.children || null}
          value={this.props.history}
        />
      </RouterContext.Provider>
    );
  }
}
export default Router;
```

接下来是Switch组件：
```jsx
import React from "react";
import PropTypes from "prop-types";
import invariant from "tiny-invariant";
import warning from "tiny-warning";

import RouterContext from "./RouterContext.js";
import matchPath from "./matchPath.js";

/**
 * The public API for rendering the first <Route> that matches.
   Switch组件渲染第一个匹配路由的Route组件
 */
class Switch extends React.Component {
  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          invariant(context, "You should not use <Switch> outside a <Router>");

          const location = this.props.location || context.location;

          let element, match;

          // We use React.Children.forEach instead of React.Children.toArray().find()
          // here because toArray adds keys to all child elements and we do not want
          // to trigger an unmount/remount for two <Route>s that render the same
          // component at different URLs.
          // this.props.children 对应的就是<Route />组件
          React.Children.forEach(this.props.children, child => {
            if (match == null && React.isValidElement(child)) {
              // 这里的if条件只会找出第一个匹配的组件
              element = child;

              const path = child.props.path || child.props.from;

              match = path
                ? matchPath(location.pathname, { ...child.props, path })
                : context.match;
            }
          });
          // 找出路由匹配上的组件，并将location、computedMatch prop传递下去。
          return match
            ? React.cloneElement(element, { location, computedMatch: match })
            : null;
        }}
      </RouterContext.Consumer>
    );
  }
}
export default Switch;
```

接下来Route组件：
```jsx
import React from "react";
import { isValidElementType } from "react-is";
import PropTypes from "prop-types";
import invariant from "tiny-invariant";
import warning from "tiny-warning";

import RouterContext from "./RouterContext.js";
import matchPath from "./matchPath.js";

function isEmptyChildren(children) {
  return React.Children.count(children) === 0;
}

function evalChildrenDev(children, props, path) {
  const value = children(props);

  warning(
    value !== undefined,
    "You returned `undefined` from the `children` function of " +
      `<Route${path ? ` path="${path}"` : ""}>, but you ` +
      "should have returned a React element or `null`"
  );

  return value || null;
}

/**
 * The public API for matching a single path and rendering.
 */
class Route extends React.Component {
  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          invariant(context, "You should not use <Route> outside a <Router>");

          const location = this.props.location || context.location;
          const match = this.props.computedMatch
            ? this.props.computedMatch // <Switch> already computed the match for us
            : this.props.path
            ? matchPath(location.pathname, this.props)
            : context.match;

          const props = { ...context, location, match };

          let { children, component, render } = this.props;

          // Preact uses an empty array as children by
          // default, so use null if that's the case.
          if (Array.isArray(children) && isEmptyChildren(children)) {
            children = null;
          }

          return (
            <RouterContext.Provider value={props}>
              {props.match
                ? children
                  ? typeof children === "function"
                    ? __DEV__
                      ? evalChildrenDev(children, props, this.props.path)
                      : children(props)
                    : children
                  : component
                  ? React.createElement(component, props)
                  : render
                  ? render(props)
                  : null
                : typeof children === "function"
                ? __DEV__
                  ? evalChildrenDev(children, props, this.props.path)
                  : children(props)
                : null}
            </RouterContext.Provider>
          );
        }}
      </RouterContext.Consumer>
    );
  }
}
export default Route;
```

Route组件就是渲染匹配上的路由对应的组件。这里渲染组件的方式有三种children、component、render，他们的先后顺序就是children、component、render，这在源码中用了一连串的三元运算符，其实也很好理解。   


所以整体来说是，Router这个组件里面监听路由location的变化，一旦location发生了变化，就会使得Switch、Route这些引用了RouterContext的组件重新渲染，重新走一遍各自组件里面对应的逻辑，然后就匹配路由的组件渲染出来。这个思路还是比较清晰的，代码也比较好理解。