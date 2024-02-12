import React, { useEffect } from 'react';
import Navbarr from './Navbarr';
import Content from './Content';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Blogs = () => {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem("user"));
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
                const response = await axios.get(`http://localhost:5000/getSingleDocument/${id}`);
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
