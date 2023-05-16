import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);

    const retrievePosts = async() => {
        await fetch('/blog')
            .then(res => res.json())
            .then(data => setPosts(data.posts));
    }

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        const token = JSON.parse(localStorage.getItem('token'))

        if (userInfo) {
            setUser(userInfo);
        }
        retrievePosts();
    }, [])

    return (
        <div>
            <div>Welcome {user.username}</div>
            {user.admin === true && (
                <Link to='http://localhost:3000/admin'>Admin Page</Link>
            )}
            {posts.map(post => {
                return (
                    <div key={post._id}>
                        {post.title}: {post.time}
                    </div>
                )
            })}
            <Link to='/blog/login'>Log In</Link>
            <Link to='/blog/signup'>Sign Up</Link>
        </div>
    )
}