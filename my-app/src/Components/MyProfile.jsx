import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Input, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const MyProfile = () => {
    const [account, setAccount] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [preImage, setPreImage] = useState(null);
    const [updateUser, setUpdateUser] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const userData = JSON.parse(localStorage.getItem("user"));
            const id = userData._id;
            try {
                const response = await axios.get(`http://localhost:5000/getSingleDocument/${id}`);
                setAccount(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [updateUser]);

    const handleEdit = () => {
        setEditMode(!editMode);
    };

    const handleUpdate = async (newName) => {
        try {
            const formData = new FormData();
            formData.append('name', newName);
            formData.append('email', account.email);

            if (fileList.length > 0) {
                formData.append('file', fileList[0].originFileObj);
            }

            const response = await axios.put('http://localhost:5000/updateUserProfile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setEditMode(false);
            setUpdateUser((prev) => !prev);
            console.log(response.data);
            message.success('Profile updated successfully');
        } catch (error) {
            console.error('Error updating user profile:', error);
            message.error('Failed to update user profile. Please try again.');
        }
    };

    const handleImageUpload = ({ fileList }) => {
        setFileList(fileList);
        const reader = new FileReader();

        reader.onloadend = () => {
            setPreImage(reader.result);
        };
    };

    const uploadProps = {
        onRemove: () => setFileList([]),
        beforeUpload: (file) => {
            setFileList([file]);
            return false;
        },
        fileList,
    };
    return (
        <div className='createBlogMainContainner'>
            <div className='createBlogBox'>
                {preImage ? (
                    <img
                        style={{ borderRadius: '50%' }}
                        width={550}
                        height={550}
                        src={preImage}
                        alt="Profile"
                    />
                ) : account.profileImage && account.profileImage.data ? (
                    <img
                        style={{ borderRadius: '50%' }}
                        width={550}
                        height={550}
                        src={URL.createObjectURL(new Blob([new Uint8Array(account.profileImage.data.data)], { type: account.profileImage.contentType }))}
                        alt="Profile"
                    />
                ) : null}
                <div className='contentContainer' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                                {editMode ? (
                                    <>
                                        <Input style={{ width: '300px' }} type="text" value={account.name} onChange={(e) => setAccount({ ...account, name: e.target.value })} />
                                        <Upload {...uploadProps} onChange={handleImageUpload}>
                                            <Button style={{ width: '300px' }} icon={<UploadOutlined />}>Update Profile Image</Button>
                                        </Upload>
                                        <Button style={{ width: '300px' }} onClick={() => handleUpdate(account.name)}>Save</Button>
                                    </>
                                ) : (
                                    <>
                                        <h1 style={{ fontSize: '40px', fontWeight: '700' }}>Name: {account.name}</h1>
                                        <p style={{ color: 'gray' }}>{account.email}</p>
                                    </>
                                )}
                                <Button onClick={handleEdit}>{editMode ? "Cancel" : "Edit Profile"}</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
