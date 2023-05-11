import React, { useEffect, useState } from 'react';

export const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirm_password: '',
        admin: '',
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
        console.log(formData)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = JSON.stringify(formData)
        let result = await fetch('/blog/signup', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: data,
        })
        console.log(result);
    }
    return (
        <form>
          <label htmlFor="username">Username: </label>
          <input value={formData.username} onChange={(e) => handleChange(e)} name="username" type="text" required/>
          <label htmlFor="password">Password: </label>
          <input value={formData.password} onChange={(e) => handleChange(e)} name="password" type="text" required/>
          <label htmlFor="confirm_password">Confirm Password: </label>
          <input value={formData.confirm_password} onChange={(e) => handleChange(e)} name="confirm_password" type="text" required/>
          <label htmlFor="admin">Admin Code: </label>
          <input value={formData.admin} onChange={(e) => handleChange(e)} name="admin" type="text" />
          <button onClick={(e) => handleSubmit(e)} type="submit">Sign Up</button>
      </form>
    )
}