import React, { useEffect, useState } from 'react';
import { Card, Spin } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
const { Meta } = Card;

const Home = () => {
    const [allBlogs, setAllBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAllBlogs = async () => {
            try {
                const response = await axios.get('https://vlog-website-4joa.onrender.com/getAllBlogsController');
                setAllBlogs(response.data.blogs);
                setLoading(false);
            } catch (error) {
                throw error.response.data.message || 'Failed to fetch blogs';
            }
        };
        getAllBlogs();
    }, []);

    return (
        <>
            {loading ? (
                <div style={{ width: '100%', height: '530px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spin size="large" />
                </div>
            ) : (
                allBlogs?.map(blogs => {
                    return (
                        <Link style={{ textDecoration: 'none' }} to={`/details/${blogs._id}`} key={blogs._id} >
                            <Card
                                hoverable
                                style={{ width: 490, height: 400 }}
                                cover={<img alt="example" width='290px' height='300px' style={{objectFit:'cover'}} src={URL.createObjectURL(new Blob([new Uint8Array(blogs.image.data.data)], { type: blogs.image.contentType }))} />}
                            >
                                <Meta title={blogs.title} description={`Created by: ${blogs.userCreateName}`} />
                            </Card>
                        </Link>
                    );
                })
            )}
        </>
    );
};

export default Home;
