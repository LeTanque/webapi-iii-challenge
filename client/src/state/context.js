import React from 'react'

const UsersContext = React.createContext({
    users:[],
    posts:[],
    currentUser:{},
})

export default UsersContext