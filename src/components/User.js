import React from 'react';


const User = (props) => {
    return ( 
        <div>
            <h1>Welcome! {props.user.name}</h1>
            <h3>Email: {props.user.email}</h3>
            <h3>Joined Class on: {props.user.createdAt}</h3>
        </div>
     );
}
 
export default User;