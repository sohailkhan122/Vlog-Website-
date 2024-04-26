import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, message, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // State to track loading status
    // const userData = JSON.parse(localStorage.getItem("user"));
    const userData = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')): null;
    useEffect(() => {
        if (userData === null) {
            navigate("/");
        } else {
            navigate("/blogs");
        }
    }, [navigate, userData]);

    const onFinish = async (values) => {
        setLoading(true); // Set loading state to true when login button is clicked
        try {
            const response = await axios.post('http://localhost:5000/login', values);
            const decoded = jwtDecode(response.data.token);
            localStorage.setItem('user', JSON.stringify(decoded));
            message.success('User LogIn successfully!');
            navigate('/blogs');
        } catch (error) {
            console.error('Error during sign up:', error);
            message.error('Login failed. Please try again.');
        } finally {
            setLoading(false); // Reset loading state after login request is completed
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <div className='MainSignUpContainer'>
                <div className='SignUpBox loginbox'>
                    <div className='SignUpFields loginFields'>
                        <h1>Log In</h1>
                        <Form
                            className='loginForm'
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Email!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <div className='ForgetPassword'>
                                <Form.Item
                                    name="remember"
                                    valuePropName="checked"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please check Remeber!',
                                        }
                                    ]}
                                >
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>
                                <Link to={'/forget'}><p>Forget Password ?</p></Link>
                            </div>
                            <Form.Item>
                                {/* Show a Spin component inside the login button if loading is true */}
                                <Button style={{ width: '100%' }} type="primary" htmlType="submit" loading={loading}>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                        <p>Don't have an account ? <Link to={'/register'}><span>Sign Up</span></Link></p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
