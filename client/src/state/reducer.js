export default function reducer(state, action) {
    switch(action.type) {
        case "GET_USERS":
            return {
                ...state, 
                users: action.payload
            }
        case "GET_POSTS":
            return {
                ...state, 
                posts: action.payload
            }
        case "SET_USER":
            return {
                ...state,
                currentUser: action.payload
            }            
        default:
            return state
    }
}