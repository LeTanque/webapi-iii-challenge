import React, { useContext, useReducer, useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../assets/logo.svg';
import UsersContext from '../state/context';
import reducer from '../state/reducer';

import Users from './Users.jsx';


// This is a function that doesn't export from component but is used within it.
const useAPI = endpoint => {
  const [ data, setData ] = useState([]);

  useEffect(() => { getData() }, []);
  
  const getData = async () => { 
    try {
      const response = await axios.get(endpoint);
      setData(response.data); 
    } catch (error) { 
      console.log(error)
    }
  };
  return data;
};


const App = () => {
  const initialState = useContext(UsersContext);
  const [ state, dispatch ] = useReducer(reducer, initialState);
  const usersAll = useAPI("http://localhost:3333/api/users");
  const postsAll = useAPI("http://localhost:3333/api/posts");

  useEffect(() => {
    dispatch({
      type: "GET_USERS",
      payload: usersAll
    });
  }, [usersAll]);

  useEffect(() => {
    dispatch({
      type: "GET_POSTS",
      payload: postsAll
    });
  }, [postsAll]);

  // console.log(state)

  return (
    <UsersContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Users users={state.users} posts={state.posts} />
        </header>
      </div>
    </UsersContext.Provider>
  );
}


export default App;
