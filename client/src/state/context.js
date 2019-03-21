import { createContext } from 'react'

const UsersContext = createContext({
    users:[],
    posts:[],
    currentUser:{},
    postsByUser:[],
})

export default UsersContext