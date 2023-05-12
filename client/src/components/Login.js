import React, { useEffect, useState } from 'react';

export const Login = (props) => {
    const { setAuth } = props;
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = JSON.stringify(formData);
        const res = await fetch('/blog/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: data,
        })
        let myJson = await res.json();
        setAuth(true);
        localStorage.setItem('userInfo', JSON.stringify(myJson.user));
        localStorage.setItem('token', JSON.stringify(myJson.token))
        window.location.href = '/blog';
    }

    return(
        <form>
          <label htmlFor="username">Username: </label>
          <input value={formData.username} onChange={(e) => handleChange(e)} name="username" type="text" />
          <label htmlFor="password">Password: </label>
          <input value={formData.password} onChange={(e) => handleChange(e)} name="password" type="text" />
          <button onClick={(e) => handleSubmit(e)} type="submit">Log In</button>
      </form>
    )
}