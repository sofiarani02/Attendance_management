import React, { useState } from 'react';
import Navbar from './Navbar';
import bgImage from './img/bg.jpg';
import { useAuthToken, logout } from './auth'; // Importing token-related functions

const Dashboard = () => {
  const { decodedToken, tokenValidity, updateDecodedToken } = useAuthToken(); // Using the custom hook
  const [profilePicture, setProfilePicture] = useState(null);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [changeProfileMessage, setChangeProfileMessage] = useState('');
  const [showUploadButton, setShowUploadButton] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
    setShowUploadButton(true);
  };

  const handleProfilePictureUpload = async () => {
    try {
        if (!profilePicture) {
            // No new image selected, do nothing
            return;
        }

        const formData = new FormData();
        formData.append('profilePicture', profilePicture);

        const response = await fetch('http://localhost:8081/api/image/upload', {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (response.ok) {
            const responseData = await response.text(); // Assuming the response is a plain text message
            console.log('Profile picture uploaded successfully:', responseData);
            setShowUploadButton(false);
        } else {
            console.error('Error uploading profile picture:', response.statusText);
        }
    } catch (error) {
        console.error('Error uploading profile picture:', error);
    }
  };

  const handleEditProfile = async () => {
    try {
      // Define the fields to be updated
      const updatedFields = {};
      if (newUsername.trim() !== '') {
        updatedFields.newUsername = newUsername;
      }
      if (newPassword.trim() !== '') {
        updatedFields.newPassword = newPassword;
      }
  
      // Send the request to update profile
      const response = await fetch('http://localhost:8081/api/users/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          email: decodedToken.sub,
          ...updatedFields,
        }),
      });
  
      if (response.ok) {
        // Update decodedToken with new username
        const newDecodedToken = { ...decodedToken }; // Create a copy of the decoded token
        newDecodedToken.username = newUsername.trim() !== '' ? newUsername : newDecodedToken.username; // Update the username
        updateDecodedToken(newDecodedToken); // Update the decoded token state
        
        setChangeProfileMessage('Profile updated successfully!');
        setShowEditProfile(false); // Hide edit profile section
        setNewUsername(''); // Clear new username field
        setNewPassword(''); // Clear new password field
        setSnackbarMessage('Profile updated successfully!');
      } else {
        setChangeProfileMessage('Failed to update profile');
        setSnackbarMessage('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setChangeProfileMessage('Failed to update profile');
      setSnackbarMessage('Failed to update profile');
    }
  };  
  
  const handleEditButtonClick = () => {
    // Display the upload button when the edit button is clicked
    setShowUploadButton(true);
  };

  return (
    <div style={page}>
      <Navbar/>

      <div style={backgroundStyle}>
        <div style={containerStyle}>
          {decodedToken && (
            <div style={dashboardStyle}>
              <h1 style={{textAlign:'center'}}>Welcome to the Dashboard!</h1>
              <div style={contentContainer}>
                <p>User name: {decodedToken.username}</p>
                <p>Email: {decodedToken.sub}</p>
                <p>Issued Date: {new Date(decodedToken.iat * 1000).toLocaleString()}</p>
                <p>Expiration Time: {new Date(decodedToken.exp * 1000).toLocaleString()}</p>
                <p>Token Validity: {tokenValidity}</p>
                <button onClick={() => setShowEditProfile(true)}>Edit Profile</button>
                {showEditProfile && (
                  <div>
                    <input
                      type="text"
                      placeholder="New Username"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                    />&nbsp;&nbsp;&nbsp;
                    <input
                      type="password"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />&nbsp;&nbsp;&nbsp;
                    <button onClick={handleEditProfile}>Submit</button>
                    <p>{changeProfileMessage}</p>
                  </div>
                )}
              </div>
              <div style={avatarContainer}>
                <div
                  style={{
                    position: 'relative',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    border: '2px solid #ccc', // Added border to the avatar
                    backgroundSize: 'cover',
                    backgroundImage: `url(${profilePicture ? URL.createObjectURL(profilePicture) : ''})`,
                  }}
                >
                  <label htmlFor="file-upload" style={editIconStyle} onClick={handleEditButtonClick}>
                    Edit
                  </label>
                  <input id="file-upload" type="file" onChange={handleFileUpload} style={fileInputStyle}/>                </div>
                {showUploadButton && ( // Show upload button conditionally
                  <button onClick={handleProfilePictureUpload}>Upload Profile Picture</button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Snackbar for displaying messages */}
      {snackbarMessage && (
        <div style={snackbarStyle}>
          <p>{snackbarMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

// Styles
const navbarStyle = {
  backgroundColor: '#333',
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
  width: '98.5%',
};

const navLinkStyle = {
  color: 'white',
  marginRight: '20px',
  textDecoration: 'none',
};

const welcomeTextStyle = {
  color: 'white',
  marginLeft: 'auto',
};

const backgroundStyle = {
  backgroundImage: `url(${bgImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: 'calc(100vh - 20px)',
  width: '100%',
};

const containerStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '40px',
  marginRight: '392px',
  width: '100%',
};

const dashboardStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  padding: '20px',
  marginRight: '70px',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  border: '1px solid black',
  width: '80%',
  maxWidth: '800px',
  margin: '0 auto',
};

const page = {
  width: '127%',
};

const contentContainer = {
  marginBottom: '20px', // Added margin to separate content from avatar
};

const avatarContainer = {
  position: 'fixed',
  top: '50%', // Adjust to position in the center vertically
  left: '65%', // Adjust to position in the center horizontally
  transform: 'translate(-50%, -50%)', // Center the container
  display: 'flex',
  flexDirection: 'column', // Change to column to stack avatar and button vertically
  alignItems: 'center',
  paddingBottom: '110px',
};

const editIconStyle = {
  position: 'absolute',
  bottom: 0,
  right: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  color: 'white',
  padding: '5px 10px',
  borderRadius: '50%',
  cursor: 'pointer',
};

const fileInputStyle = {
  display: 'none',
};

const snackbarStyle = {
  position: 'fixed',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: '#333',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '8px',
};