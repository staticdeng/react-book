import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxTest from './ReduxTest';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <ReduxTest />
    </Provider>,
    document.getElementById('root')
);