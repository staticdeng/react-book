import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Jsx extends Component {
    render() {
        return(
            <div id="jsx">
                <span>jsx</span>
            </div>
        )
    }
}
ReactDOM.render(<Jsx />, document.getElementById('root'));