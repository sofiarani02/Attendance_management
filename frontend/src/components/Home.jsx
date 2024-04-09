import React, { useState } from 'react';
import Navbar from './Navbar';
// import bg232 from './img/bg1.png';
function Home() {
  // Assuming you have some state to track the user's authentication status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
<div style={{ 
  background: 'linear-gradient(to bottom, #FFC0CB, #FFFFFF)', 
  minHeight: '100vh', 
  padding: '5px', 
  width:'229%' 
}}>

      {isLoggedIn ? (
        <Navbar />
      ) : (
        <Navbar />
      )}
      <div style={{ marginTop: '20px', textAlign: 'center', width:'100%' }}>
        <h1 style={{ color: '#333', fontSize: '36px', marginBottom: '20px', fontFamily: 'Arial, sans-serif' }}>ATTENDANCE MANAGEMENT</h1>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '50%', padding: '20px', backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', fontFamily: 'Arial, sans-serif' }}>
            <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6', textAlign: 'left' }}>
              Attendance management system using react, spring boot and mysql with user and admin logins. 
            </p>
            <p style={{ color: '#000', fontSize: '16px', lineHeight: '1.6', textAlign: 'left', marginTop: '20px' }}>
              User Login:
            </p>
            <ul style={{ color: '#666', fontSize: '16px', lineHeight: '1.6', paddingLeft: '20px', textAlign: 'left', marginTop: '10px' }}>
              <li>View and edit profile</li>
              <li>View login entries</li>
              <li>Apply for leave</li>
              <li>Check leave status</li>
            </ul>
            <p style={{ color: '#000', fontSize: '16px', lineHeight: '1.6', textAlign: 'left', marginTop: '20px' }}>
              Admin Login:
            </p>
            <ul style={{ color: '#666', fontSize: '16px', lineHeight: '1.6', paddingLeft: '20px', textAlign: 'left', marginTop: '10px' }}>
              <li>View and edit profile</li>
              <li>View login entries of admim</li>
              <li>View login entries of individual users</li>
              <li>Manage leave request</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
