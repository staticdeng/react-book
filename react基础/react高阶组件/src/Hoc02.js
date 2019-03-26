import React, { Component } from 'react'

// 定义一个无状态组件，这个组件为展示某本书的章节，props.name为书名，props.section为章节
function Book(props) {
    return(
        <div>
            { props.name } - { props.section }
        </div>
    )
}

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

// 链式调用
export default withUserLog(withSection(Book))


