import React from './react';
import ReactDOM from './react-dom';

function JsxFunc(props){
    return (
        <div>
            <span>{props.name}</span>
        </div>
    )
}

class JsxClass extends React.Component {
    render() {
        return (
            <div>
                <span>{this.props.name}</span>
            </div>
        )
    }
}

const Jsx = (
    <div id="jsx">
        <JsxFunc name="this is JsxFunc" />
        <JsxClass name="this is JsxClass"/>
    </div>
)

ReactDOM.render(Jsx, document.getElementById('root'));