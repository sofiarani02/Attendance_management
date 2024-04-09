import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

function AdminPage() {
  const [records, setRecords] = useState([]);
  const [showAdminRecords, setShowAdminRecords] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecords();
  }, [showAdminRecords, currentPage]);

  const fetchRecords = async () => {
    try {
      const response = await fetch(
        showAdminRecords
          ? `http://localhost:8081/api/admin?page=${currentPage}&limit=${recordsPerPage}`
          : `http://localhost:8081/api/userList?page=${currentPage}&limit=${recordsPerPage}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch records');
      }
      const data = await response.json();
      setRecords(data);
    } catch (error) {
      console.error('Error fetching records:', error.message);
    }
  };

  const handleAdminLogin = () => {
    setShowAdminRecords(true);
    setCurrentPage(1);
    navigate('/admin');
  };

  const handleUserLogin = () => {
    setShowAdminRecords(false);
    setCurrentPage(1);
    navigate('/admin/users');
  };

  const handleViewAttendance = (email) => {
    navigate(`/users?email=${email}`);
  };

  const handleManageLeave = (email) => {
    navigate(`/manage-leave?email=${email}`);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Logic for displaying current records
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <div style={{minWidth:"100vw", marginTop:"-110px", textAlign: 'center',background: 'linear-gradient(to bottom, #FFC0CB, #FFFFFF)' }}>
      <Navbar/>
      <h1>{showAdminRecords ? 'Admin Records' : 'User Records'}</h1>
      <div>
        <button onClick={handleAdminLogin}>Admin Login</button>&nbsp;&nbsp;&nbsp;
        <button onClick={handleUserLogin}>Users Login</button>
  
      </div>
      <br /><br />
      <table style={{ width: '70%', borderCollapse: 'collapse', marginLeft:'200px'}}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Username</th>
            <th style={tableHeaderStyle}>Email</th>
            {showAdminRecords ? (
              <>
                <th style={tableHeaderStyle}>Date</th>
                <th style={tableHeaderStyle}>Time</th>
              </>
            ) : (
              <>
                <th style={tableHeaderStyle}>View Attendance</th>
                <th style={tableHeaderStyle}>Manage Leave</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {currentRecords.map(record => {
            if (showAdminRecords || record.email !== 'admin@gmail.com') {
              return (
                <tr key={record.id} style={tableRowStyle}>
                  <td style={tableCellStyle}>{record.username}</td>
                  <td style={tableCellStyle}>{record.email}</td>
                  {showAdminRecords ? (
                    <>
                      <td style={tableCellStyle}>{record.date}</td>
                      <td style={tableCellStyle}>{record.time}</td>
                    </>
                  ) : (
                    <>
                      <td style={tableCellStyle}>
                        <button onClick={() => handleViewAttendance(record.email)}>View Attendance</button>
                      </td>
                      <td style={tableCellStyle}>
                        <button onClick={() => handleManageLeave(record.email)}>Manage Leave</button>
                      </td>
                    </>
                  )}
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
      <br />
      {/* Pagination */}
      <div>
        {Array.from({ length: Math.ceil(records.length / recordsPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;

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
