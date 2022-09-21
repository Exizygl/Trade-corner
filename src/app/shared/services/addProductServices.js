export function addProductState(state, action) {
    if(state == null) return action.payload
    return [...state, action.payload]
}
