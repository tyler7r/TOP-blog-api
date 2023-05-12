import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

export const Home = () => {
    const [data, setData] = useState('');

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
        } catch (err) {

        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            {data.title}
            <Link to='/admin/post/create'>Create Post</Link>
        </div>
    )
}