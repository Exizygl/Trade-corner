export function addProductState(state, action) {
    console.log
    if(state == null) return action.payload
    return [...state, action.payload]
}
