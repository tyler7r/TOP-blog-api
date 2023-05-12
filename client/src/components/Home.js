import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        const token = JSON.parse(localStorage.getItem('token'))

        if (userInfo) {
            setUser(userInfo);
            console.log(userInfo);
            console.log(token);
        }
    }, [])

    return (
        <div>
            <div>Welcome {user.username}</div>
            {user.admin === true && (
                <Link to='http://localhost:3000/admin'>Admin Page</Link>
            )}
            <Link to='/blog/login'>Log In</Link>
            <Link to='/blog/signup'>Sign Up</Link>
        </div>
    )
}