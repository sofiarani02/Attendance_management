import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';

function ManageLeave() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/leave/status?email=${email}`);
        if (response.ok) {
          const data = await response.json();
          setLeaveRequests(data);
          setLoading(false);
        } else {
          setError('Failed to fetch leave requests');
          setLoading(false);
        }
      } catch (error) {
        setError('Error fetching leave requests');
        setLoading(false);
      }
    };

    if (email) {
      fetchLeaveRequests();
    }
  }, [email]);

  const handleStatusChange = async (leaveId, status) => {
    try {
      const response = await fetch(`http://localhost:8081/api/leave/update-status/${leaveId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        throw new Error('Failed to update status');
      }
      // Update leaveRequests with the updated status
      const updatedLeaveRequests = leaveRequests.map(leave => {
        if (leave.id === leaveId) {
          return { ...leave, status };
        }
        return leave;
      });
      setLeaveRequests(updatedLeaveRequests);
      // Refetch leave data to reflect changes
      fetchLeaveRequests();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };  

  if (!email) {
    return <div>No user email provided!</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{minWidth:"100vw", marginTop:"-330px", textAlign: 'center', background: 'linear-gradient(to bottom, #FFC0CB, #FFFFFF)' }}>
      <Navbar/><br />
      <h2>Manage Leave Requests for {email}</h2>
      <table style={{ width: '70%', borderCollapse: 'collapse', margin: 'auto' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>From Date</th>
            <th style={tableHeaderStyle}>To Date</th>
            <th style={tableHeaderStyle}>Reason</th>
            <th style={tableHeaderStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map(leave => (
            <tr key={leave.id} style={tableRowStyle}>
              <td style={tableCellStyle}>{leave.fromDate}</td>
              <td style={tableCellStyle}>{leave.toDate}</td>
              <td style={tableCellStyle}>{leave.reason}</td>
              <td style={tableCellStyle}>
                <select
                  value={leave.status}
                  onChange={e => handleStatusChange(leave.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageLeave;

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
