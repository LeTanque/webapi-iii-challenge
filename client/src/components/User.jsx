import React, { 
    Fragment, 
    useReducer,
    useContext,
} from 'react';
import UsersContext from '../state/context';
import reducer from '../state/reducer';



const User = props => {
    const initialState = useContext(UsersContext);
    const [ state, dispatch ] = useReducer(reducer, initialState);

    const setUser = (userObject) => {
        dispatch({
            type: "SET_USER",
            payload: userObject
        });
    }
    
    console.log(initialState)
    return (
        <Fragment>

            <section className='user-card'>
                {props.userName}
                <button onClick={() => setUser(props)} >Set User</button>
            </section>

        </Fragment>
    )
}

export default User