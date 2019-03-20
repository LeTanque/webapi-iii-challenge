import React from 'react'

const UsersContext = React.createContext({
    users:[],
    posts:[],
    currentUser:{},
    postsByUser:[],
})

export default UsersContext