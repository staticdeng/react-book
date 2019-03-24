import React, { PureComponent } from 'react'

// 展示型组件
// PureComponent阻止不必要的更新
export default class List extends PureComponent {
    render() {
        console.log('list render')
        return(
            // <div>{this.props.list.title}</div>
            <div>{this.props.title}</div>
        )
    }
}