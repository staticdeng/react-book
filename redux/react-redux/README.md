# react-redux

在[redux核心概念](../redux核心概念/README.md)中，介绍了如何在react中使用redux，但是store state变化还要通过store.subscribe订阅更新，如何更优雅地使用redux？所以使用react-redux.

由此知道react-redux的作用是连接react组件和redux仓库.

安装：

```bash
npm install react-redux --save
```

提供了两个api：

* Provider顶级组件，提供store数据
* connect高阶组件，提供数据和方法

### react-redux连接react和redux配置：

入口文件index.js:

用Provider顶级组件包裹，传入store.

```js
import { Provider } from 'react-redux';
import store from './store';
import ReduxTest from './ReduxTest';

ReactDOM.render(
    <Provider store={store}>
        <ReduxTest />
    </Provider>,
    document.getElementById('root')
);
```

ReduxTest.js:

用react-redux的connect高阶组件，分别传入mapStateToProps和mapDispatchToProps函数可以接收到store里面提供的state和dispatch，包装组件ReduxTest后，在ReduxTest里就可以通过this.props接受数据的状态了.

```js
import React, { Component } from 'react'
import { add, minus } from './action'
import { connect } from 'react-redux'

class ReduxTest extends Component {
    render() {
        return (
            <div>
                {this.props.total}
                <div>
                    <button onClick={() => this.props.minus(2)}>-</button>
                    <button onClick={() => this.props.add(2)}>+</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        total: state.total
    }
}
const mapDispatchToProps = dispatch => {
    return {
        add: (num) => {
            dispatch(add(num))
        },
        minus: (num) => {
            dispatch(minus(num))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ReduxTest)
```
不写mapStateToProps和mapDispatchToProps函数，可以简写为:

```js
...
export default connect(
    state => ({ total: state.total }),
    dispatch => ({
        add: (num) => dispatch(add(num)),
        minus: (num) => dispatch(minus(num))
    }) 
)(ReduxTest)
```
装饰器写法为：(create-react-app环境不支持装饰器写法，需要额外配置，具体配置谷歌)

```js
@connect(
    state => ({ total: state.total }),
    dispatch => ({
        add: (num) => dispatch(add(num)),
        minus: (num) => dispatch(minus(num))
    })
)
class ReduxTest extends Component {
    ...
}
export default ReduxTest
```

### combineReducers

redux中如果有不同的reducer文件，就需要combineReducers把这些reducer结合成一个reduer，然后传入到createStore里.

```js
import { createStore, combineReducers } from 'redux'
import couterReducer from './reducer'

// const store = createStore(couterReducer)
const store = createStore(
    combineReducers({
        couterReducer,
    })
)
export default store
```

在取state数据的时候，只需要用state加上combineReducers里面传入的相关reducer名，其他不变：

ReduxTest.js:

```js
export default connect(
    // state => ({ total: state.total }),
    state => ({ total: state.couterReducer.total }),
    dispatch => ({
        add: (num) => dispatch(add(num)),
        minus: (num) => dispatch(minus(num))
    }) 
)(ReduxTest)
```
