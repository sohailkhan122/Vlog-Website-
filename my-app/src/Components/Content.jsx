import React, { useState } from "react";
import { Button } from "antd";
import {
    HeartOutlined,
    HomeOutlined,
    IdcardOutlined,
    LogoutOutlined,
    UserOutlined,
} from "@ant-design/icons"; import Home from "./Home";
import { Link, useNavigate } from "react-router-dom";


const Content = ({ account }) => {
    const navigate = useNavigate();
    const [value, setValue] = useState('Home')

    const handleLogOut = () => {
        localStorage.clear()
        navigate('/')
    }
    return (
        <div style={{ display: "flex" }}>
            <div className="mainSidebarContainer">
                <div className="sidebarContainer">
                    <div className="sidebarContent">
                        <img src="/Images/New Arrival Logo.png" alt="logo" />
                        <span>Hello {account.name}</span>
                    </div>
                    <p>Welcome to your Account</p>
                    <div className="sidebarButton">
                        <Button icon={<HomeOutlined />}  style={{ backgroundColor: value === 'Home' ? '#8a33fd' : '' }} onClick={() => setValue('Home')}>Home</Button>
                        <Link to={'/createBlogs'}><Button icon={<UserOutlined />} >Create Blogs</Button></Link>
                        <Link to={'/blogs/myProfile'}><Button icon={<IdcardOutlined />}>My Profile</Button></Link>
                        <Link to={'/about'}><Button icon={<HeartOutlined />}>About</Button></Link>
                        <Link to={'/contact'}><Button icon={<UserOutlined />}>Contact Us</Button></Link>
                        <Button icon={<LogoutOutlined />} onClick={handleLogOut}>Sign out</Button>
                    </div>
                </div>
            </div>
            <div className="mainContentContainer">
                {
                    value === 'Home' && (<Home />)
                }
            </div>
        </div>
    )
}

export default Content
