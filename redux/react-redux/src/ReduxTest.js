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

export default connect(
    state => ({ total: state.couterReducer.total }),
    dispatch => ({
        add: (num) => dispatch(add(num)),
        minus: (num) => dispatch(minus(num))
    }) 
)(ReduxTest)
