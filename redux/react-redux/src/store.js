import { createStore, combineReducers } from 'redux'
import couterReducer from './reducer'

// const store = createStore(couterReducer)
const store = createStore(
    combineReducers({
        couterReducer,
    })
)
export default store