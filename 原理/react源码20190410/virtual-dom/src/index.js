import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Jsx extends Component {
    render() {
        return (
            <div id="jsx">
                <span>jsx</span>
            </div>
        )
    }
}

// console.log(<Jsx />)
console.log(<Jsx><div>jsx子组件</div></Jsx>)

ReactDOM.render(<Jsx />, document.getElementById('root'));