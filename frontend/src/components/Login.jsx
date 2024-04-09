import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import bgImage from './img/bg.png';
import img from './img/SignupLogin.png';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row', // Display in a row
    justifyContent: 'space-between', // Space between items
    alignItems: 'center', // Center items vertically
    margin: 'auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparent background
    border: '1px solid black', // Black border
    marginLeft: '180px',
    marginRight: '150px',
    marginTop: '3vh',
    height: '90vh',
  },
  imageContainer: {
    flex: 1, // Take up 1 part of the container
  },
  image: {
    width: '100%',
    height: 'auto', // Maintain aspect ratio
  },
  formContainer: {
    flex: 1, // Take up 1 part of the container
    marginLeft: '50px', // Adjust spacing
    overflowY: 'auto',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '10px',
    display: 'flex', // Display label and input in the same line
    alignItems: 'flex-end', // Align items vertically in the center
  },
  label: {
    marginBottom: '5px',
    color: 'black', // Label color
    textAlign: 'left',
    width: '100%', // Adjusted width
  },
  input: {
    padding: '8px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid black', // Black border
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Transparent background
    color: 'black', // Text color
    width: '100%', // Adjusted width
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#4caf50',
    color: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
    border: '1px solid black', // Black border
    marginBottom: '10px', // Space between buttons
  },
  error: {
    color: 'red',
    marginTop: '5px',
    marginLeft: '10px', // Adjust the error message position
  },
};

const backgroundStyle = {
  backgroundImage: `url(${bgImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '110vh',
  overflow: 'hidden',
  width: '224vh',
  marginTop: '-10px',
  marginLeft: '-53px',
  marginBottom: '-58px'
};

const Login = () => {
  const [loginUser, setLoginUser] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const redirectToJobPortal = () => {
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any of the fields are empty
    if (Object.values(loginUser).some(value => value.trim() === '')) {
      // If any field is empty, set errors for all fields
      const emptyErrors = {};
      for (const key in loginUser) {
        if (loginUser[key].trim() === '') {
          emptyErrors[key] = 'This field is required';
        }
      }
      setErrors(emptyErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginUser),
        credentials: 'include',
      });

      if (response.ok) {
        const responseData = await response.json();
        const { token } = responseData;

        // Check if the token is defined
        console.log("Received Token:", token);

        // Store the token in local storage
        localStorage.setItem('token', token);

        redirectToJobPortal();
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginUser({
      ...loginUser,
      [name]: value
    });

    // Validate input using regex
    validateInput(name, value);
  };

  const validateInput = (name, value) => {
    const newErrors = { ...errors };

    // Validate each input field
    switch (name) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        newErrors.email = !emailRegex.test(value) ? 'Invalid email address' : '';
        break;
      case 'password':
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
        newErrors.password = !passwordRegex.test(value) ? 'Password must be at least 6 characters long and contain at least one letter and one number' : '';
        break;
      default:
        break;
    }

    // Update errors state
    setErrors(newErrors);
  };

  return (
    <div style={backgroundStyle}>
      <div style={styles.container}>
        <div style={styles.imageContainer}>
          <img src={img} alt="Signup Login" style={styles.image} />
        </div>
        <div style={styles.formContainer}>
          <h1 style={styles.heading}>Login Page</h1>
          <form onSubmit={handleSubmit} style={styles.form} className="login-form">
            <div style={styles.formGroup}>
              <label style={styles.label}>Email:</label>
              <input type="email" name="email" value={loginUser.email} onChange={handleInputChange} required style={styles.input} />
            </div>
            <p style={styles.error}>{errors.email}</p>
            <div style={styles.formGroup}>
              <label style={styles.label}>Password:</label>
              <input type="password" name="password" value={loginUser.password} onChange={handleInputChange} required style={styles.input} />
            </div>
            <p style={styles.error}>{errors.password}</p>
            <button type="submit" style={styles.button}>Login</button>
          </form>
          <p>
            Need to Signup? <Link to="/signup">Create Account</Link>
          </p>
          <p>
            <Link to="/forgot-password">Forgot your password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
