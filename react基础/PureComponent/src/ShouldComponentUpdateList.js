import React, { Component } from 'react'

// 展示型组件
// shuoldComponentUpdate判断是否更新
export default class List extends Component {
    // 在shuoldComponentUpdate里判断props传递的数据没有发生变化，则不需要render
    shouldComponentUpdate(nextProps) {
        // 返回值为true则render，为false则不render
        if(nextProps.list.title === this.props.list.title) {
            return false
        }
        return true
    }
    render() {
        console.log('list render')
        return(
            <div>{this.props.list.title}</div>
        )
    }
}