# react源码之JSX与虚拟dom原理解析

在分析JSX和virtual-dom之前，我们可以看看[官方react源码](https://github.com/facebook/react/blob/master/packages/react/src/React.js)，在这个链接里就是react的源码入口，主要暴露了react的一些api，比如react一些核心api createElement，Component，PureComponent等都暴露在了React对象里面，而react-dom主要负责render.

## JSX原理

* jsx是什么？jsx是对js语法的扩展，在js里能够写html.

* 为什么要用jsx？是因为jsx编译快，简单快速；在编译阶段就可以发现错误，所以安全.

* jsx原理：

jsx本质上是将jsx语法的代码转换成React.createElement，为react内部创建虚拟dom提供条件.

简单来说，**jsx的原理是webpack和babel-loader编译jsx为React.createElement(type, props, ...children)的形式.**

在[Babel](https://babeljs.io/repl/)官网上实验一下将jsx编译成React.createElement：


```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Jsx extends Component {
    render() {
        return(
            <div id="jsx">
                <span>jsx</span>
            </div>
        )
    }
}
ReactDOM.render(<Jsx />, document.getElementById('root'));
```

Babel编译后：(不要勾选编译es2015)

```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Jsx extends Component {
    render() {
        return React.createElement(
            "div", 
            { id: "jsx" }, 
            React.createElement("span", null, "jsx")
        );
    }
}

ReactDOM.render(React.createElement(Jsx, null), document.getElementById('root'));
```

可以看到jsx部分都会被编译成调用React.createElement的形式，所以React.createElement(type, props, ...children)中参数依次为节点类型，节点属性(或props)，子节点(子节点也会递归调用React.createElement).