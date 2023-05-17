import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Comment } from './Comment';

export const Home = (props) => {
    const { setUser, user, setAuth, auth } = props;
    const [posts, setPosts] = useState([]);

    const retrievePosts = async() => {
        let publishedPosts = [];
        await fetch('/blog')
            .then(res => res.json())
            .then(data => {
                for (let i = 0; i < data.posts.length ; i++) {
                    if (data.posts[i].publish === true) {
                        publishedPosts.push(data.posts[i])
                    }
                }
                setPosts(publishedPosts);
            });
        publishedPosts = [];
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
            <h1>The Blog</h1>
            {user && 
            <>
                <div>Welcome: {user.username}</div>
                {user.admin === true && (
                    <Link to='http://localhost:3000/admin'>Admin Page</Link>
                )}
            </>
            }
            <h2>Posts</h2>
            {posts.map(post => {
                return (
                    <div key={post._id}>
                        {post.title}: {post.time}
                        <Link to={`/blog/posts/${post._id}`}>Comment</Link>
                    </div>
                )
            })}
            <Link to='/blog/login'>Log In</Link>
            <Link to='/blog/signup'>Sign Up</Link>
        </div>
    )
}