import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const Comment = (props) => {
    const { postId } = useParams();
    const { user, setUser } = props;
    const [errors, setErrors] = useState([]);
    const [postData, setPostData] = useState(null);
    const [formData, setFormData] = useState({
        comment_username: '',
        comment: '',
    });

    useEffect(() => {
        let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        if (userInfo) {
            setUser(userInfo);
            setFormData({...formData, comment_username: userInfo.username})
        }
        getData();
    }, [])

    const getData = async () => {
        let token = JSON.parse(localStorage.getItem('token'));
        let bearer = `Bearer ${token}`
        try {
            await fetch(`/blog/posts/${postId}`, {
                method: 'get',
                header: {
                    'Authorization': bearer,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).then(data => {
                setPostData(data)
            })
        } catch(err) {
            console.error(err)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = JSON.stringify(formData);
        const token = JSON.parse(localStorage.getItem('token'));
        const bearer = `Bearer ${token}`
        await fetch (`/blog/posts/${postId}/create/comment`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': bearer,
            },
            body: data,
        }).then(res => res.json())
            .then(data => {
            if (data.errors) {
                setErrors(data.errors)
            } else {
                window.location.href = `/blog/posts/${postId}`;
            }
            getData();
        })
    }

    return (
        <>
            {postData !== null &&
                <div>
                    <h2>{postData.post.title}</h2>
                    <div>{postData.post.text}</div>
                    <h3>Comments</h3>
                    {postData.comments.map(comment => {
                        return (
                            <div key={comment._id}>
                                <div>{comment.text}</div>
                                <div>Like Comment</div>
                            </div>
                        )
                    })}
                </div>
            }
            <form>
                {user && 
                <div>Username: {user.username}</div>
                }
                {!user &&
                <>
                    <label htmlFor='comment_username'>Username: </label>
                    <input type='text' onChange={(e) => handleChange(e)} value={formData.comment_username} name='comment_username' />
                </>
                }
                <label htmlFor='comment'>Comment: </label>
                <input type='text' onChange={(e) => handleChange(e)} value={formData.comment} name='comment'/>
                <button type='submit' onClick={(e) => handleSubmit(e)}>Submit</button>
            </form>
            {errors.length > 0 && 
                errors.map(error => {
                    return (
                        <li key={error.msg}>{error.msg}</li>
                    )
            })}
        </>
    )
}