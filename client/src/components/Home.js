import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PostDetail } from './PostDetail';

export const Home = (props) => {
    const { setUser, user, setAuth, auth } = props;
    const [posts, setPosts] = useState(null);

    const retrievePosts = async() => {
        await fetch('/blog/', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json()).then(data => {
                let publishedPosts = data.posts.filter(post => post.publish === true)
                setPosts(publishedPosts);
            });
    }

    const handleLike = async (e) => {
        const token = JSON.parse(localStorage.getItem('token'));
        const bearer = `Bearer ${token}`
        try {
            await fetch(`/blog/posts/${e.target.id}/like`, {
                method: 'get',
                headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                }
            })
            retrievePosts();
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        retrievePosts();
        if (userInfo) {
            setUser(userInfo);
            setAuth(true);
        }
    }, [])

    return (
        <>
            {posts !== null &&
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
                            <Link to={`/blog/posts/${post._id}`}>{post.title}: {post.time}</Link>
                            <div id={post._id} onClick={(e) => handleLike(e)}>Like Post</div>
                            <div>{post.likes.length}</div>
                        </div>
                    )
                })}
                {auth === false && 
                <>
                    <Link to='/blog/login'>Log In</Link>
                    <Link to='/blog/signup'>Sign Up</Link>
                </>
                }
            </div>
            }
        </>
    )
}