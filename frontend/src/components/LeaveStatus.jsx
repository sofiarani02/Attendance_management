import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useAuthToken } from './auth'; // Importing the useAuthToken hook

const LeaveStatus = () => {
  const { decodedToken } = useAuthToken();
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (decodedToken) {
      const fetchLeaveDetails = async () => {
        try {
          const response = await fetch(`http://localhost:8081/api/leave/status?email=${decodedToken.sub}`);
          if (response.ok) {
            const data = await response.json();
            setLeaveData(data);
            setLoading(false);
          } else {
            setError('Failed to fetch leave details');
            setLoading(false);
          }
        } catch (error) {
          setError('Error fetching leave details');
          setLoading(false);
        }
      };

      fetchLeaveDetails();
    }
  }, [decodedToken]);

  // Function to refetch leave data
  const refetchLeaveData = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/leave/status?email=${decodedToken.sub}`);
      if (response.ok) {
        const data = await response.json();
        setLeaveData(data);
      }
    } catch (error) {
      console.error('Error fetching leave details:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (leaveData.length === 0) {
    return <div>No leave data available</div>;
  }

  return (
    <div style={{ minWidth: '100vw', marginTop: '-330px', textAlign: 'center' }}>
      <Navbar />
      <h2>Leave Status</h2>
      <table style={{ width: '70%', borderCollapse: 'collapse', margin: 'auto' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Username</th>
            <th style={tableHeaderStyle}>Email</th>
            <th style={tableHeaderStyle}>From Date</th>
            <th style={tableHeaderStyle}>To Date</th>
            <th style={tableHeaderStyle}>Reason</th>
            <th style={tableHeaderStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaveData.map(leave => (
            <tr key={leave.id} style={tableRowStyle}>
              <td style={tableCellStyle}>{leave.username}</td>
              <td style={tableCellStyle}>{leave.email}</td>
              <td style={tableCellStyle}>{leave.fromDate}</td>
              <td style={tableCellStyle}>{leave.toDate}</td>
              <td style={tableCellStyle}>{leave.reason}</td>
              <td style={tableCellStyle}>{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveStatus;

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
