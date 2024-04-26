import { DeleteOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Input, Spin, Upload, message } from 'antd';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import FroalaEditor from 'react-froala-wysiwyg';

const Details = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [blog, setBlog] = useState({});
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedContent, setEditedContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [updateUser, setUpdateUser] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [saving, setSaving] = useState(false);
    const userData = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')): null;

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/getSingleBlogController/${id}`);
                setBlog(response.data.blog);
                setLoading(false);
                setEditedTitle(response.data.blog.title);
                setEditedContent(response.data.blog.content);
                setImageUrl(URL.createObjectURL(new Blob([new Uint8Array(response.data.blog.image.data.data)], { type: response.data.blog.image.contentType })));
            } catch (error) {
                console.error('Error fetching blog:', error.message);
            }
        };

        fetchBlog();
    }, [id, updateUser]);

    const handleTitleChange = (e) => {
        setEditedTitle(e.target.value);
    };

    const handleContentChange = (content) => {
        setEditedContent(content);
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleImageUpload = ({ fileList }) => {
        setFileList(fileList);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const formData = new FormData();
            formData.append('title', editedTitle);
            formData.append('content', editedContent);

            if (fileList.length > 0) {
                formData.append('file', fileList[0].originFileObj);
            }
            const response = await axios.put(`http://localhost:5000/updateBlogController/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            await axios.get(`http://localhost:5000/getSingleBlogController/${id}`);
            setBlog(response.data.blog);
            setUpdateUser((prev) => !prev);
            console.log('Blog saved successfully:', response.data);
            message.success('Blog Update successfully')
            setEditMode(false);
        } catch (error) {
            console.error('Error saving blog:', error.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });


    const uploadProps = {
        onRemove: () => setFileList([]),
        beforeUpload: (file) => {
            setFileList([file]);
            return false;
        },
        fileList,
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/deleteBlogController/${id}`);
            message.success('Blog Delete successfully')
            navigate('/blogs')
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Failed to delete blog');
        }
    }
    return (
        <div className='createBlogMainContainner'>
            {!editMode ? (
                <div className='createBlogBox'>
                    <img style={{ borderRadius: '50%' }} width={550} height={550} src={imageUrl} alt="Blog" />
                    <div className='contentContainer'>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h1 style={{ fontSize: '40px', fontWeight: '700' }}>{blog.title}</h1>
                                    <p style={{ color: 'gray' }}>{formattedDate}</p>
                                </div>
                                {
                                    userData._id === blog.userCreate && <div style={{ display: 'flex', gap: '20px' }}>
                                        <EditOutlined style={{ fontSize: '30px' }} onClick={handleEdit} />
                                        <DeleteOutlined style={{ fontSize: '30px' }} onClick={() => handleDelete(blog._id)} />
                                    </div>
                                }
                            </div>
                            <div style={{ paddingTop: '20px' }} dangerouslySetInnerHTML={{ __html: blog.content }} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className='createBlogBox'>
                    <img style={{ borderRadius: '50%' }} width={550} height={550} src={imageUrl} alt="Blog" />
                    <div className='contentContainer'>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', paddingTop: "40px" }}>
                            <Upload {...uploadProps} onChange={handleImageUpload}>
                                <Button icon={<UploadOutlined />}>Update Profile Image</Button>
                            </Upload>
                            <Input value={editedTitle} onChange={handleTitleChange} />
                            <FroalaEditor tag='textarea' model={editedContent} onModelChange={handleContentChange} />
                            <Button onClick={handleSave} loading={saving}>Save</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Details;
