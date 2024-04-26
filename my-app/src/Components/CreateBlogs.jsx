import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Upload, message } from 'antd'
import FroalaEditorComponent from 'react-froala-wysiwyg';
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/plugins.pkgd.min.css';

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CreateBlogs = () => {
    const navigate = useNavigate();
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(null)
    const [preImage, setPreImage] = useState(null)
    const [account, setAccount] = useState({});
    const userData = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')): null;

    const id = userData._id
    useEffect(() => {
        const getSingleDocument = async () => {
            try {
                const response = await axios.get(`https://vlog-website-4joa.onrender.com/getSingleDocument/${id}`);
                setAccount(response.data)
            } catch (error) {
                console.log(error)
            }
        };
        getSingleDocument()
    }, [id])

    const onFinish = async (values) => {
        try {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('content', description);
            formData.append('userCreate', account._id);
            formData.append('userCreateName', account.name);

            if (image && image.length > 0) {
                formData.append('image', image[0].originFileObj);
            }
            console.log(formData)
            const response = await axios.post(
                'https://vlog-website-4joa.onrender.com/createBlog',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (response.status === 201) {
                message.success('Blog created successfully!');
                navigate('/blogs');
            } else {
                message.error('Failed to create blog. Please try again.');
            }

            return response.data;
        } catch (error) {
            console.error('Error creating blog:', error);
            message.error('Failed to create blog. Please try again.');
            throw error;
        }
    };



    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    const handleImageChange = (e) => {
        setImage(e.fileList);
        const file = e.fileList[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setPreImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file.originFileObj);
        }
    };



    return (
        <div className='createBlogMainContainner'>
            <div className='createBlogBox'>
                <img style={{ borderRadius: '50%' }} width={550} height={550} src={preImage ? preImage : "https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="123" />
                <div style={{ width: '500px', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Form
                        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >

                        <Form.Item
                            label="Profile Image"
                            name="fileList"
                            valuePropName="fileList"
                            getValueFromEvent={handleImageChange}
                        >
                            <Upload
                                beforeUpload={() => false}
                                listType="picture-card"
                            >
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            label="Title"
                            name="title"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Content"
                            name="content"
                            style={{ maxHeight: '300px', overflowY: 'auto' }}
                        >
                            <FroalaEditorComponent
                                tag='textarea'
                                config={{
                                }}
                                onModelChange={(value) => setDescription(value)}
                            />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 10,
                                span: 20,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>

                </div>
            </div>
        </div>
    )
}

export default CreateBlogs
