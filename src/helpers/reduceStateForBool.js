export default function reduceStateForBool(state, name, value) {
    const oldValue = state[name];
    if (oldValue === value) {
        return state;
    }
    return {
        ...state,
        [name]: value,
    };
}
