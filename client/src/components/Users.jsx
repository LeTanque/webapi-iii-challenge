import React, { Fragment } from 'react';

import User from './User.jsx';


const Users = props => {
    return (
        <Fragment>
            <h3>Users</h3>

            {props.users.map(user => {
                return (
                    <Fragment key={user.id}>
                        <User userName={user.name} userID={user.id} />
                    </Fragment>
                )
            })}
            
        </Fragment>
    )
}

export default Users