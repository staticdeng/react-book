import React, { Component } from 'react'
// import ShouldComponentUpdateList from './ShouldComponentUpdateList'
import PureComponentList from './PureComponentList'

// 容器组件
export default class App extends Component {
    state = {
        data: []
    }
    componentDidMount() {
        // 定时任务，每隔一秒更新数据
        setInterval(() => {
            this.setState({
                data: [
                    { title: 'react line 1' }, 
                    { title: 'react line 2' }, 
                ]
            })
        }, 1000)
    }
    render() {
        return(
            <div>
                {
                    this.state.data.map((item, index) => (
                        // <ShouldComponentUpdateList key={index} list={item} />
                        // <PureComponentList key={index} list={item}/>
                        <PureComponentList key={index} title={item.title}/>
                    ))
                }
            </div>
        )
    }
}