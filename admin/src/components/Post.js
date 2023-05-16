import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const Post = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        text: '',
    })
    const [errors, setErrors] = useState([]);

    const getUpdate = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        const bearer = `Bearer ${token}`
        try {
            const req = await fetch(`/admin/post/${id}/update`, {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': bearer,
                },
            })
            const myJson = await req.json();
            setFormData({
                title: myJson.post.title,
                text: myJson.post.text,
            })
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if (window.location.href === `http://localhost:3000/admin/post/${id}/update`) {
            getUpdate()
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = JSON.parse(localStorage.getItem('token'));
        const bearer = `Bearer ${token}`
        let data = JSON.stringify(formData);
        const postData = async (url) => {
            await fetch(url, {
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
                        window.location.href = '/admin';
                    }
                })
        }
        if (window.location.href === 'http://localhost:3000/admin/post/create') {
            postData('/admin/post/create');
        } else if (window.location.href === `http://localhost:3000/admin/post/${id}/update`) {
            postData(`/admin/post/${id}/update`)
        }
    }

    return (
        <>
            <form>
                <label htmlFor="title">Title: </label>
                <input value={formData.title} onChange={(e) => handleChange(e)} name="title" type="text" required/>
                <label htmlFor="text">Text: </label>
                <input value={formData.text} onChange={(e) => handleChange(e)} name="text" type="text" required/>
                <button onClick={(e) => handleSubmit(e)} type="submit">Sign Up</button>
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