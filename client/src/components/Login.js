import React, { useEffect, useState } from 'react';

export const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        console.log(e.target.name, e.target.value);
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = async (e) => {
        const data = JSON.stringify(formData);
        const result = await fetch('/blog/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: data,
        })
        console.log(result);
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