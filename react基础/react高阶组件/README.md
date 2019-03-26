# react高阶组件

为什么使用高阶组件？**为了提高组件复用率**，我们首先想到的是抽离相同的逻辑，在react中就有了HOC(Higher-Order Components)的概念，所以*react中的高阶组件是用来提高组件复用率的*。

## 高阶组件概念

高阶组件是一个函数，传入一个组件，返回另一个新的组件，产生的新的组件可以对属性进行包装，也可以重写部分生命周期。

### 高阶组件的无状态组件

高阶组件中返回新的组件，可以是class形式，也可以是无状态组件的形式，下面看看高阶组件中怎么返回一个无状态组件。

现在有一个需求，需要一个组件，传入某本书的的书名，根据书名获取到章节，由于根据书名获取到章节的这部分逻辑是相同的，所以我们可以抽取成为一个公共组件，这个公共组件就是高阶组件。

新建src/Hoc.js，里面定义一个展示某本书章节的无状态组件Book，props.name为书名，props.section为章节：

```js
import React from 'react'
function Book(props) {
    return(
        <div>
            { props.name } - { props.section }
        </div>
    )
}
export default Book
```

在src/index.js中使用该组件，传入书名，渲染在根节点：

```js
import React from 'react';
import ReactDOM from 'react-dom';
import Hoc from './Hoc';

ReactDOM.render(<Hoc name="react"/>, document.getElementById('root'));
```

还差一个根据书名获取到章节的高阶组件withSection，在Book组件中使用这个高阶组件：

```js
function Book(props) {
    ...
}
const withSection = Com => {
    return props => {
        const section = '章节 - 高阶组件的无状态组件' // 根据书名props.name获取到章节section，这里是模拟数据
        return(
            <Com {...props} section={section} />
        )
    }
}
export default withSection(Book)
```
这个获取章节的高阶组件传入的是一个组件Book，返回的是一个无状态组件，在返回的这个组件中把获取章节的逻辑处理了，Book本来没有章节的信息，在使用高阶组件后就有了。

npm start，浏览器输出

```
react - 章节 - 高阶组件的无状态组件
```

### 高阶组件的class组件

如果我们要在高阶组件withSection里面使用生命周期函数，这时候withSection里面的无状态组件就不适用了，我们需要用到class形式的组件。

```js
// 高阶组件里使用生命周期函数
const withSection = Com => {
    class GetSection extends Component {
        state = {
            section: ''
        }
        componentDidMount() {
            // ajax
            const section = '章节 - 高阶组件的class组件'
            this.setState({ section })
        }
        render() {
            return <Com {...this.props} section={this.state.section} />
        }
    }
    return GetSection
}
```

### 高阶组件的链式调用

除了给Book组件加根据书名获取章节名的高阶组件，我们还想记录一下用户阅读的时间，那应该怎么办？高阶组件可以链式调用，可以嵌套多个高阶组件，我们再来定义一个高阶组件withUserLog：

```js
const withUserLog = Com => {
    class GetUserLog extends Component {
        componentDidMount() {
            console.log('记录了用户的阅读时间操作')
        }
        render() {
            return <Com {...this.props} />
        }
    }
    return GetUserLog
}
```

嵌套使用高阶组件就行了：

```js
function Book(props) {
    ...
}
const withSection = Com => {
    ...
}
const withUserLog = Com => {
    ...
}
// 链式调用
export default withUserLog(withSection(Book))
```

