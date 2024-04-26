import React, { useEffect, useState } from 'react';
import Navbarr from './Navbarr';
import Content from './Content';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Blogs = () => {
    const navigate = useNavigate();
    const userData = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')): null;
    const [account, setAccount] = useState({});
    useEffect(() => {
        if (userData === null) {
            navigate("/");
        } else {
        }
        navigate("/blogs");
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const id = userData._id;
            try {
                const response = await axios.get(`https://vlog-website-4joa.onrender.com/getSingleDocument/${id}`);
                setAccount(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className='mainContainnerBlogs'>
            <Navbarr />
            <Content account={account} />
        </div>
    );
};

export default Blogs;
