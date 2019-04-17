import React, { Component } from './react';
import ReactDOM from './react-dom';

const Jsx = (
    <div id="jsx">
        <span>jsx</span>
    </div>
)
console.log(Jsx)

// function JsxFunc(){
//     return (
//         <div id="jsx">
//             <span>jsx</span>
//         </div>
//     )
// }

// class JsxClass extends Component {
//     render() {
//         return (
//             <div id="jsx">
//                 <span>jsx</span>
//             </div>
//         )
//     }
// }

// console.log(<JsxFunc/>)
// console.log(<JsxClass/>)

ReactDOM.render(Jsx, document.getElementById('root'));