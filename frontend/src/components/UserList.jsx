import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Navbar from './Navbar';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Number of users to display per page
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');

  useEffect(() => {
    if (email) {
      fetchUsersByEmail(email);
    }
  }, [email]);

  useEffect(() => {
    // Retrieve email from the token stored in local storage
    const token = localStorage.getItem('token');
    if (token && !email) { // Only fetch users if email is not passed as query param
      const decodedToken = jwtDecode(token);
      const email = decodedToken.sub; // Assuming email is stored in 'sub' field
      if (email) {
        fetchUsersByEmail(email);
      }
    }
  }, [email]);

  const fetchUsersByEmail = async (email) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:8081/api/employees?email=${email}`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError('Error fetching users');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Logic to paginate users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{minWidth:"100vw", marginTop:"-190px", textAlign: 'center' , background: 'linear-gradient(to bottom, #FFC0CB, #FFFFFF)', }}>
      <Navbar/>
      <h1>User List</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <table style={{ width: '70%', borderCollapse: 'collapse', margin: 'auto' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Username</th>
            <th style={tableHeaderStyle}>Email</th>
            <th style={tableHeaderStyle}>Date</th>
            <th style={tableHeaderStyle}>Time</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id} style={tableRowStyle}>
              <td style={tableCellStyle}>{user.username}</td>
              <td style={tableCellStyle}>{user.email}</td>
              <td style={tableCellStyle}>{user.date}</td>
              <td style={tableCellStyle}>{user.time}</td>
            </tr>
          ))}
        </tbody>
      </table><br/>
      {/* Pagination */}
      <div>
        {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
      {/* <button onClick={handleApplyLeave} style={buttonStyle}>Apply Leave</button>  */}
    </div>
  );
}

export default UserList;

// Inline styles
const tableHeaderStyle = {
  backgroundColor: '#f2f2f2',
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left',
};

const tableRowStyle = {
  backgroundColor: '#fff',
};

const tableCellStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left',
};
