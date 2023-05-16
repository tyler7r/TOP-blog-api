import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'

export const Home = () => {
    const [data, setData] = useState({});
    const [posts, setPosts] = useState([]);
    const { id } = useParams();

    const getData = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        const bearer = `Bearer ${token}`
        try {
            const req = await fetch('/admin', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bearer
                }
            })
            const myJson = await req.json();
            setData(myJson);
            setPosts(myJson.posts);
        } catch (err) {

        }
    }

    const changeStatus = async (e) => {
        const token = JSON.parse(localStorage.getItem('token'));
        const bearer = `Bearer ${token}`
        try {
            await fetch(`/admin/post/${e.target.id}/publish`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bearer,
                }
            })
            getData();
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <Link to='/admin/post/create'>Create Post</Link>
            <h2>Posts</h2>
                {posts.map(post => {
                    return (
                        <div key={post._id}>
                            <div>{post.title}</div>
                            <div>Published: {post.publish.toString()}</div>
                            <div id={post._id} onClick={(e) => changeStatus(e)}>Publish Post</div>
                            <Link id={post._id} to={`/admin/post/${post._id}/update`}>Update Post</Link>
                            <Link to={`/admin/post/${post._id}/delete`}>Delete Post</Link>
                        </div>
                    )
                })}
        </div>
    )
}