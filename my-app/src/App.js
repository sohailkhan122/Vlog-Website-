import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Blogs from './Components/Blogs';
import Details from './Components/Details';
import CreateBlogs from './Components/CreateBlogs';
import About from './Components/About';
import Contact from './Components/Contact';
import Login from './Components/Authentication/Login';
import SignUp from './Components/Authentication/SignUp';
import AccountProvider from './Components/Context/AccountProvider';
import MyProfile from './Components/MyProfile';

const App = () => {
  return (
    <Router>
      <AccountProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/createBlogs" element={<CreateBlogs />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blogs/myProfile" element={<MyProfile />} />
        </Routes>
      </AccountProvider>
    </Router>
  );
};

export default App;
