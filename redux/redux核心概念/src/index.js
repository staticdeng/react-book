import React from 'react';
import ReactDOM from 'react-dom';
import ReduxTest from './ReduxTest';
import store from './store';

const render = () => {
    ReactDOM.render(<ReduxTest />, document.getElementById('root'));
}
render()

store.subscribe(render)