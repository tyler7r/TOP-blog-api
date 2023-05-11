import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))

        if (userInfo) {
            setUser(userInfo);
            console.log(userInfo);
        }
    }, [])

    return (
        <div>
            <div>Welcome {user.username}</div>
            <Link to='/blog/login'>Log In</Link>
            <Link to='/blog/signup'>Sign Up</Link>
        </div>
    )
}