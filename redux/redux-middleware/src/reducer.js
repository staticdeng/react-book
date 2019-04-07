export default function couterReducer(state = {
    total: 0
}, action) {
    switch (action.type) {
        case 'ADD':
            return {
                total: state.total + action.payload
            }
        case 'MINUS':
            return {
                total: state.total - action.payload
            }
        default:
            return state
    }
}