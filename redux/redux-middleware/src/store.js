import { createStore, combineReducers, applyMiddleware } from 'redux'
import couterReducer from './reducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

// const store = createStore(couterReducer)
const store = createStore(
    combineReducers({
        couterReducer,
    }),
    applyMiddleware(thunk, logger)
)
export default store