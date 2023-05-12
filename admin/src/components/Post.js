import React, { useState } from 'react';

export const Post = () => {
    const [formData, setFormData] = useState({
        title: '',
        text: '',
    })
    const [posts, setPosts] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let token = JSON.parse(localStorage.getItem('token'));
        let bearer = `Bearer ${token}`;
        let data = JSON.stringify(formData);
        await fetch('/admin/post/create', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': bearer,
            },
            body: data,
        })
        window.location.href = '/admin';
    }

    return (
        <form>
            <label htmlFor="title">Title: </label>
            <input value={formData.title} onChange={(e) => handleChange(e)} name="title" type="text" required/>
            <label htmlFor="text">Text: </label>
            <input value={formData.text} onChange={(e) => handleChange(e)} name="text" type="text" required/>
            <button onClick={(e) => handleSubmit(e)} type="submit">Sign Up</button>
        </form>
    )
}