import React from 'react';
import axios from 'axios'
const UsersList = ({users, selectUser, getUsers}) => {
    const deleteUser = (id) => {
        axios.delete(`https://users-crud1.herokuapp.com/users/${id}/`)
            .then(() => getUsers())
    }
    return (
        <div>
            <br />
            <h1>Users List</h1>
            <br />
            <ul className='user-container'>
                {
                    users.map(user => (
                        <li className='user-item' key={user.id}>
                            <div className='user-card'>
                                <p> <b>First Name:</b> {user.first_name}</p>
                                <p> <b>Last Name:</b> {user.last_name}</p>
                                <p> <b>Email:</b> {user.email}</p>
                                <p> <b>Birthday:</b> {user.birthday}</p>
                                <div className='btn-container'>
                                    <button className='btn-edit' onClick={() => selectUser(user)}> 
                                        Edit
                                    </button>
                                    <button className='btn-delete' onClick={() => deleteUser(user.id)}>
                                        Delete
                                    </button>
                                </div>
                                <br />
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default UsersList;