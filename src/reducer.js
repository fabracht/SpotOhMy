function setToken(token) {
    localStorage.setItem("spottok", token);
}



export default function reducer(state, action) {
    switch (action.type) {
        case "SET_TOKEN":
            setToken(action.payload);
            return {
                token: action.payload
            };
        default:
            return state;
    }
}