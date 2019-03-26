import React from 'react'

// 定义一个无状态组件，这个组件为展示某本书的章节，props.name为书名，props.section为章节
function Book(props) {
    return(
        <div>
            { props.name } - { props.section }
        </div>
    )
}

// 高阶组件里返回一个无状态组件，里面获取到章节信息
const withSection = Com => {
    return props => {
        console.log(props);
        const section = '章节 - 高阶组件的无状态组件' // 根据书名props.name获取到章节section，这里是模拟数据
        return(
            <Com {...props} section={section} />
        )
    }
}

// 用高阶组件withSection扩展Section组件
export default withSection(Book)


