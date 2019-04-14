# react源码之JSX与虚拟dom原理解析

在分析JSX和virtual-dom之前，我们可以看看[官方react源码](https://github.com/facebook/react/blob/master/packages/react/src/React.js)，在这个链接里就是react的源码入口，主要暴露了react的一些api，比如react一些核心api createElement，Component，PureComponent等都暴露在了React对象里面，而react-dom主要负责render。

## JSX原理

* jsx是什么？jsx是对js语法的扩展，在js里能够写html。

* 为什么要用jsx？是因为jsx编译快，简单快速；在编译阶段就可以发现错误，所以安全。

* jsx原理：

jsx本质上是将jsx语法的代码转换成React.createElement，为react内部创建虚拟dom提供条件。

简单来说，**jsx的原理是webpack和babel-loader编译jsx为React.createElement(type, props, ...children)的形式。**

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

可以看到jsx部分都会被编译成调用React.createElement的形式，所以React.createElement(type, props, ...children)中参数依次为节点类型，节点属性(或props)，子节点(子节点也会递归调用React.createElement)。

## 虚拟dom

### 虚拟dom是什么？

webpack和babel-loader编译时，替换jsx成React.createElement形式后，**React.createElement执行得到一个js对象树，这个js对象树能完整描述dom结构，称之为虚拟dom(virtual-dom)。**

下面在react中输出看看这个虚拟dom是什么样子：

```js
class Jsx extends Component {
    render() {
        return (
            <div id="jsx">
                <span>jsx</span>
            </div>
        )
    }
}
console.log(<Jsx />)
```

`<Jsx />`组件是什么呢？用console.log打印出来：

<img src="./images/virtual-dom01.png" />

发现`<Jsx />`是js对象而不是真实的dom，这个对象包含了type，props这些我们在前面讲到的babel转化jsx为React.createElement里面的两个参数，注意此时props是空对象。接下来，我们添加子节点打印`<Jsx><div>jsx子组件</div></Jsx>`，看看控制台会输出什么：

<img src="./images/virtual-dom02.png" />

props发生了变化，由于`<Jsx />`组件中加了子组件`<div>jsx子组件</div>`，所以在描述`<Jsx />`的对象props中增加了children。同理，如果我们进行多层的组件嵌套，其实就是在父对象的props中增加children字段及对应的描述值，也就是js对象的递归嵌套。

### React.createElement生成虚拟dom

**虚拟dom其实就是描述真实dom结构的js对象**，在react中通过React.createElement生成。


下面来写一个自己的react.js和react.dom.js：

src/react.js:

```js
function createElement(type, props, ...children) {
    props.children = children;
    return { type, props };
}

const React = {
    createElement,
};
export default React;
```
在jsx编译成createElement的形式时，在react内部需要有一个方法createElement来接收babel编译好的type, props, children, 这里作一个将children放到props里面的简单处理后返回这些参数的操作，这样就生成了最简单的虚拟dom。

src/react.dom.js:

render方法实现挂载：

```js
function render(vnode, container) {
    // vnode虚拟节点，container挂载的容器
    container.innerHTML = `<pre>${JSON.stringify(vnode, null, 2)}</pre>`;
}

export default { render }; 
```

src/index.js测试：

```js
import React from './react';
import ReactDOM from './react-dom';

const Jsx = (
    <div id="jsx">
        <span>jsx</span>
    </div>
)
console.log(Jsx)

ReactDOM.render(Jsx, document.getElementById('root'));
```

上面的测试代码中，为了更好地显示虚拟dom的结构，`Jsx`没有写成函数组件或者class组件，输出`Jsx`，发现虚拟dom的结构如下，达到预期效果：

<img src="./images/virtual-dom03.png" />

## 虚拟dom生成真实dom

参考链接：

[React源码解析(一):组件的实现与挂载](https://juejin.im/post/5983dfbcf265da3e2f7f32de)

[React源码分析 - 组件初次渲染](https://juejin.im/post/5a92e02d6fb9a0633d71f7f7)