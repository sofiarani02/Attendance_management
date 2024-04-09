import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import ForgotPassword from './ForgotPassword';
import AdminPage from './AdminPage';
import UserList from './UserList';
import LeaveForm from './LeaveForm';
import LeaveStatus from './LeaveStatus';
import ManageLeave from './ManageLeave';
import Notfound from './Notfound';
import Contacts from './Contacts';
import About from './About';

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/leave-form" element={<LeaveForm />} /> {/* Use element instead of component */}
        <Route path="/admin/users" element={<AdminPage />} />
        <Route path="/leave-status" element={<LeaveStatus />} />    
        <Route path="/manage-leave" element={<ManageLeave />} />  
        <Route path="/about" element = {<About />} />
        <Route path="/contacts" element = {<Contacts />} />
        <Route path="*" element={<Notfound />} />        
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;
