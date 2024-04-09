import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { format } from 'date-fns';
import { useAuthToken } from './auth'; // Importing the useAuthToken hook

const LeaveForm = () => {
  const { decodedToken } = useAuthToken();
  const [formData, setFormData] = useState({
    username: decodedToken ? decodedToken.username : '',
    email: decodedToken ? decodedToken.sub : '',
    fromDate: '',
    toDate: '',
    reason: '',
  });

  useEffect(() => {
    // Update form data if decodedToken exists
    if (decodedToken) {
      setFormData({
        ...formData,
        username: decodedToken.username,
        email: decodedToken.sub,
      });
    }
  }, [decodedToken]); // Update form data when decodedToken changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = name.includes('Date') ? format(new Date(value), 'yyyy-MM-dd') : value;
    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8081/api/leave/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Redirect to home page after successful submission
        window.location.href = '/'; // Alternatively, use a different navigation approach
      } else {
        console.error('Failed to apply for leave');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCheckLeaveStatus = () => {
    // Redirect to the leave status page
    window.location.href = '/leave-status'; // Change to the correct URL
  };

  return (
    <div style={{minWidth:"100vw", marginTop:"-10px", textAlign: 'center', background: 'linear-gradient(to bottom, #FFC0CB, #FFFFFF)' }}>
      <Navbar/>
      <h1 style={headerStyle}>Apply for Leave</h1>
      <form onSubmit={handleSubmit} style={{ width: '700px', marginLeft: '370px' }}>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Username:</label>
          <input type="text" name="username" value={formData.username} style={{ ...inputStyle, color: '#999' }} readOnly />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Email:</label>
          <input type="email" name="email" value={formData.email} style={{ ...inputStyle, color: '#999' }} readOnly />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>From Date:</label>
          <input type="date" name="fromDate" value={formData.fromDate} onChange={handleChange} style={inputStyle} required />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>To Date:</label>
          <input type="date" name="toDate" value={formData.toDate} onChange={handleChange} style={inputStyle} required />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Reason:</label>
          <textarea name="reason" value={formData.reason} onChange={handleChange} style={{ ...inputStyle, height: '100px' }} required />
        </div>
        <button type="submit" style={buttonStyle}>Submit</button>
        <button type="button" onClick={handleCheckLeaveStatus} style={{ ...buttonStyle, backgroundColor: 'blue', marginTop: '10px' }}>Check Leave Status</button>
      </form>
    </div>
  );
};

export default LeaveForm;

// Styles (assuming they remain unchanged)
const headerStyle = {
  textAlign: 'center',
  marginBottom: '20px',
};

const formGroupStyle = {
  marginBottom: '20px',
};

const labelStyle = {
  display: 'flex',
  marginBottom: '5px',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: 'green',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const linkStyle = {
  display: 'block',
  textAlign: 'center',
  marginTop: '20px',
  color: 'blue',
  textDecoration: 'none',
};
