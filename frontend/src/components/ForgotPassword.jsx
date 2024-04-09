import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import bgImage from './img/bg.png';

const styles = {
  container: {
    display: 'flex',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '101.25vw',
    marginLeft: '-20px',
    marginTop: '0px',
  },
  formContainer: {
    marginTop: '80px',
    marginBottom: '100px',
    marginLeft: '500px',
    marginRight: '400px',
    position: 'relative',
    border: '2px solid #ccc',
    padding: '40px',
    borderRadius: '5px',
    width: '500px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjusted background color
  },
  heading: {
    fontSize: '28px',
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  input: {
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '10px',
    marginBottom: '10px',
    width: '100%',
  },
  error: {
    color: 'red',
  },
  button: {
    backgroundColor: '#4caf50',
    borderRadius: '4px',
    padding: '10px',
    fontSize: '16px',
    color: '#fff',
    cursor: 'pointer',
    width: '100%',
  },
};

const backgroundStyle = {
  backgroundImage: `url(${bgImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100%',
};

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [notification, setNotification] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (input) => {
    const value = input.trim();
    if (!value) {
      setEmailError('Email is required');
    } else if (!emailRegex.test(value)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordReset = async () => {
    try {
      if (!email) {
        setNotification('Please provide your email address.');
        return;
      }

      await sendPasswordResetEmail(auth, email);
      setNotification('Password reset email sent. Please check your inbox.');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ ...backgroundStyle, ...styles.container }}>
      <div style={styles.formContainer}>
        <h1 style={styles.heading}>Forgot Password</h1>
        <form onSubmit={handlePasswordReset} className="password-reset-form">
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
            style={{ ...styles.input, border: emailError ? '1px solid red' : '' }}
          />
          {emailError && <p style={styles.error}>{emailError}</p>}
          <button type="submit" style={styles.button}>
            <p>Reset Password</p>
          </button>
          <p>
            Back to <Link to="/login">Login</Link>
          </p>
        </form>

        {notification && (
          <div style={{ position: 'fixed', top: '10px', right: '10px', backgroundColor: '#4CAF50', color: 'white', padding: '10px', borderRadius: '5px' }}>
            {notification}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
