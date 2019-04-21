# react16.3新的Context

**使用Context，可以跨越组件进行数据传递**。Context 通过组件树提供了一个传递数据的方法，从而避免了在每一个层级手动的传递 props 属性。在react v16.3版本之前，react官方一直不推荐使用，并声称该特性属于实验性质的API，但是很多库如react-redux都使用了它，react v16.3版本给我们带来了全新的Context api，相比于老版本更加简洁。

在一个典型的 React 应用中，数据是通过 props 属性由上向下（由父及子）的进行传递的，这对于某些类型的属性而言是极其繁琐的（例如：地区偏好，UI主题），这是应用程序中许多组件都所需要的。 Context 提供了一种在组件之间共享此类值的方式，而不必通过组件树的每个层级显式地传递 props。

## Context api

#### React.createContext

```js
const {Provider, Consumer} = React.createContext(defaultValue);
// or
const Context = React.createContext(defaultValue);
```

创建一对 { Provider, Consumer }，Provider为属性提供者，Consumer为属性消费者，也可以写成`const Context = React.createContext(defaultValue)`，然后分别使用`<Context.Provider></Context.Provider>`和`<Context.Consumer></Context.Consumer>`.

#### Provider

```js
<Provider value={/* some value */}>
// or
<Context.Provider value={/* some value */}></Context.Provider>
```

接收一个 value 属性传递给 Provider 的后代 Consumers。一个 Provider 可以联系到多个 Consumers。Providers 可以被嵌套以覆盖组件树内更深层次的值。

#### Consumer

```js
<Consumer>
  {value => /* render something based on the context value */}
</Consumer>
```
一个可以订阅 context 变化的 React 组件。

接收一个 函数作为子节点. 函数接收当前 context 的值并返回一个 React 节点。传递给函数的 value 将等于组件树中上层 context 的最近的 Provider 的 value 属性。如果 context 没有 Provider ，那么 value 参数将等于被传递给 createContext() 的 defaultValue 。

每当Provider的值发生改变时, 作为Provider后代的所有Consumers都会重新渲染。 从Provider到其后代的Consumers传播不受shouldComponentUpdate方法的约束，因此即使祖先组件退出更新时，后代Consumer也会被更新。

通过使用与[Object.is](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description)相同的算法比较新值和旧值来确定变化。

## 何时使用 Context

Context 设计目的是为共享那些被认为对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言。例如，在下面的代码中，我们通过一个“theme”属性手动调整一个按钮组件的样式，需要从父组件一级级地才能传递到子组件：

```js
function ThemedButton(props) {
  return <button style={{ color: props.theme }}>button</button>
}

// 中间组件
function ThemeWrap(props) {
  // ThemeWrap组件必须添加一个额外的theme属性，然后传递它给最终需要theme的ThemedButton组件
  return (
    <div>
      <ThemedButton theme={props.theme} />
    </div>
  );
}

class App extends React.Component {
  render() {
    return <ThemeWrap theme="blue" />;
  }
}
```

使用 context, 可以避免通过中间元素传递 props：

```js
// 创建一个 theme Context
const Context = React.createContext();
const theme = 'blue';

function ThemedButton(props) {
  // ThemedButton 组件从 Context.Consumer 获取数据theme
  return (
    <Context.Consumer>
      {/* 获取数据必须内嵌一个函数 */}
      {value => <button {...props} style={{ color: value }}>button</button>}
    </Context.Consumer>
  );
}

// 中间组件
function ThemeWrap(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class App extends React.Component {
  render() {
    return (
      // Context.Provider在最外层包裹，value传递数据theme
      <Context.Provider value={theme}>
        <ThemeWrap />
      </Context.Provider>
    );
  }
}
```

注意：不要仅仅为了避免在几个层级下的组件传递 props 而使用 context，它是被用于在多个层级的多个组件需要访问相同数据的情景。

## 高阶组件中的 Context

Context.Provider和Context.Consumer可以被多次使用，特别是Context.Consumer，也就可以用高阶组件来封装Context：

```js
// Provider和Consumer的高阶组件
const withProvider = Com => props => (
    <Context.Provider value={theme}>
        <Com {...props} />
    </Context.Provider>
)
const withConsumer = Com => props => (
    <Context.Consumer value={theme}>
        {value => <Com {...props} value={value} />}
    </Context.Consumer>
)
```

使用：

Button使用withConsumer：

```js
function Button({value, ...rest}) {
  return (
    <button {...rest} style={{ color: value }}>button</button>
  );
}
const ThemedButton = withConsumer(Button)

```

最外层组件使用withProvider：

```js
class App extends React.Component {
  render() {
    return (
        <ThemeWrap />
    );
  }
}

export default withProvider(App)
```

**注：上面涉及到的所有:point_right:[源代码](./src)**

**参考链接：**

[中文官网Context](https://react.docschina.org/docs/context.html)

