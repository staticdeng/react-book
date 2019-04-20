# react源码之组件和生命周期实现

在上一篇文章[react源码之JSX与虚拟dom原理解析](../virtual-dom/README.md)，我们实现了基础的JSX渲染功能，但是React的意义在于组件化。在这篇文章中，我们就要实现React的组件功能。

## React.Component

react中的组件分为函数组件和class组件，函数组件可以看做是class组件的一种简单形式。所以我们首先来实现以下Component这个类。

在react中，class组件需要继承Component：

```js
import React, { Component } from 'react';
```
所以初步实现这个Component类，这里只是简单初始化state和props，为后面组件的渲染做准备。

继承Component定义的组件有自己的私有状态state，可以通过this.state获取到。同时也能通过this.props来获取传入的数据。  

所以在构造函数中，我们这样初始化state和props

```js
class Component {
    constructor( props = {} ) {
        this.props = props;
        this.state = {};
    }
    setState() {
        // 后面实现
    }
}

const React = {
    ...,
    Component,
};
```

测试class组件和函数组件，看一下它们的虚拟dom：

```js
import React, { Component } from './react';
// import ReactDOM from 'react-dom';

function JsxFunc(){
    return (
        <div id="jsx">
            <span>jsx</span>
        </div>
    )
}

class JsxClass extends Component {
    render() {
        return (
            <div id="jsx">
                <span>jsx</span>
            </div>
        )
    }
}
console.log(<JsxFunc/>)
console.log(<JsxClass/>)

// ReactDOM.render(<JsxFunc/>, document.getElementById('root'));
```
分别输出函数组件`<JsxFunc/>`和class组件`<JsxClass/>`，查看它们的虚拟dom结构如下：

<img src="./images/component01.png" />

对比上一篇文章[react源码之JSX与虚拟dom原理解析](../virtual-dom/README.md)中的原生jsx的虚拟dom结构，可以发现组件的虚拟dom的type不再是标签，而是函数的形式。(注：为了验证组件的虚拟dom结构的正确性，可以直接`import React, { Component } from 'react';`来验证组件的虚拟dom结构也还是如此)。

实际上，对于组件，createElement得到的参数略有不同：
如果JSX片段中的某个元素是组件，那么createElement的第一个参数将会是一个方法，而不是字符串。

> 区分组件和原生jsx的工作，是babel帮我们做的

我们不需要对createElement做修改，只需要知道如果渲染的是组件，type的值将是一个函数，所以需要判断type来渲染组件的虚拟dom。

## 组件render和props

上一篇文章中实现的render方法只支持渲染原生jsx元素，我们需要修改ReactDOM.render方法，让其支持渲染组件的虚拟dom成真实dom。

在上一章将原生jsx的虚拟dom转为真实dom的基础上，加上vnode.type为函数(也就是组件)的判断：

```js
function initVnode( vnode ) {
    ...
    // vnode为组件
    if ( typeof vnode.type === 'function' ) {
        return createComponent( vnode.type, vnode.props );
    }
}
```

实现渲染组件的createComponent方法：

```js
// 渲染组件方法
function createComponent( type, props ) {
    const instance = createComponentInstance( type, props );
    return renderComponent( instance );
}
// 创建组件的实例
function createComponentInstance( comp, props ) {
    let instance;
    // 组件类型判断 是函数类型组件还是class类型组件
    if ( comp.prototype && comp.prototype.render ) {
        // class类型组件 comp参数是一个Component的子类直接实例化，并且把props传到Component里
        instance = new comp( props );
    }else {
        // 函数类型组件 将其扩展为class类型组件
        instance = new Component( props );
        instance.constructor = comp;
        instance.render = function() {
            return this.constructor( props );
        }
    }
    return instance;
}
// 渲染组件，将组件的虚拟dom渲染成真实dom
function renderComponent( instance ) {
    const newVnode = instance.render(); // 执行render得到原生jsx
    return initVnode( newVnode );
}
```

通过上面代码可以知道，实现组件的虚拟dom渲染成真实dom的原理是，对于class类型组件创建组件的实例并且传入props，对于函数类型组件将其扩展为class类型组件并且传入props，这样组件就可以直接使用props了，结合着React.Component的实现一起来看，这就是props的实现原理。

创建组件的实例后，就有了对应的render方法，执行render方法得到原生jsx了，然后就回到了上一章讲的渲染原生jsx的内容了。

## 生命周期

## setState实现

这篇文章的代码在[:point_right:这里](./src/)

参考链接：

[从零开始实现一个React（二）：组件和生命周期](https://github.com/hujiulong/blog/issues/5)