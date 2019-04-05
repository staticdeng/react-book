import React, { Component } from 'react'
import store from './store';
import { add, minus } from './action'

export default class ReduxTest extends Component {
    render() {
        return (
            <div>
                {store.getState().total}
                <div>
                    <button onClick={() => store.dispatch(minus(2))}>-</button>
                    <button onClick={() => store.dispatch(add(2))}>+</button>
                </div>
            </div>
        )
    }
}
