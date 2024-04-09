import React, { useEffect, useState, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [decodedToken, setDecodedToken] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // Import useNavigate

  // Empty dependency array ensures this effect runs once on component mount
  useEffect(() => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    // Check if the token is present
    if (token) {
      // Token exists, decode the token
      const decoded = jwtDecode(token);

      // Set the decoded token details in state
      setDecodedToken(decoded);
    }
  }, []); // Empty dependency array ensures this effect runs once on component mount

  const handleLogout = () => {
    // Perform logout functionality here, such as clearing local storage or redirecting to login page
    localStorage.removeItem('token');
    // Example redirection to login page
    window.location.href = '/login';
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  useEffect(() => {
    // Close the dropdown when navigating away from the dashboard page
    return () => {
      closeDropdown();
    };
  }, [location]); // Listen for changes in location

  useEffect(() => {
    // Function to handle click outside of dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    // Event listener for clicks outside of dropdown
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAttendanceClick = () => {
    if (decodedToken && decodedToken.sub === 'admin@gmail.com') {
      // Navigate to /admin page
      navigate('/admin');
    } else {
      // Navigate to /users page with email query parameter
      const userEmail = decodedToken ? decodedToken.sub : null;
      navigate(`/users?email=${userEmail}`);
    }
  };

  return (
    <nav style={navbarStyle}>
      <a href="/" style={navLinkStyle}>
        Home
      </a>
      <a href="/about" style={navLinkStyle}>
        About
      </a>
      <a href="/contacts" style={navLinkStyle}>
        Contacts
      </a>
      <a onClick={handleAttendanceClick} style={navLinkStyle}>
        Attendance
      </a>
      {decodedToken && decodedToken.sub !== 'admin@gmail.com' && (
        <a href="/leave-form" style={navLinkStyle}>
          Apply Leave
        </a>
      )}
      <div style={{ marginLeft: 'auto' }}>
        <div style={{ position: 'relative' }}>
          {decodedToken ? (
            <React.Fragment>
              <span style={welcomeTextStyle}>Welcome, {decodedToken.username}</span>
              <button onClick={toggleDropdown} style={dropdownButtonStyle}>☰</button>
              {dropdownOpen && (
                <div ref={dropdownRef} style={dropdownContentStyle}>
                  <Link to="/dashboard" style={dropdownLinkStyle}>Dashboard</Link>
                  <button onClick={handleLogout} style={dropdownButtonStyle}>Logout</button>
                </div>
              )}
            </React.Fragment>
          ) : (
            <Link to="/signup" style={{ color: 'white', textDecoration: 'none', marginRight: '10px', backgroundColor: '#333',}}>Sign Up</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Dashboard;

// Styles (unchanged from your provided code)
const navbarStyle = {
  backgroundColor: '#333',
  display: 'flex',
  alignItems: 'center',
  width: '99.6%',
  paddingTop:'5px',
  paddingBottom:'5px',
  paddingRight:'5px'
};

const navLinkStyle = {
  color: 'white',
  marginLeft: '20px',
  textDecoration: 'none',
};

const welcomeTextStyle = {
  color: 'white',
  marginLeft: 'auto',
  marginRight:'20px'
};

const dropdownButtonStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1rem',
  color: 'white',
};

const dropdownContentStyle = {
  position: 'absolute',
  backgroundColor: '#333',
  minWidth: '160px',
  right: 0,
  top: '100%',
  display: 'block'
};

const dropdownLinkStyle = {
  color: 'white',
  padding: '12px 16px',
  textDecoration: 'none',
  display: 'block',
};
