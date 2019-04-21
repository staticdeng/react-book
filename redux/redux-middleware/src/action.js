export function add(num) {
    return {
        type: 'ADD',
        payload: num
    }
}
export function asyncAdd(num) {
    return dispatch => {
        setTimeout(() => {
            dispatch({
                type: 'ADD',
                payload: num
            })
        }, 1000)
    };
}
export function minus(num) {
    return {
        type: 'MINUS',
        payload: num
    }
}