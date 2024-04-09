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
  googleButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#4285F4',
    color: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
    border: '1px solid black', // Black border
    marginBottom: '10px',
    textAlign: 'center' // Space between buttons
  },
  googleIcon: {
    marginRight: '8px',
    color: '#fff',
    paddingLeft: '150px'
  },
  error: {
    color: 'red',
    marginTop: '5px',
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

const Signup = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    retypePassword: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    retypePassword: ''
  });

  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate('/login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update user state
    setUser({
      ...user,
      [name]: value
    });

    // Validate input immediately after user input
    validateInput(name, value);
  };

  const validateInput = (name, value) => {
    const newErrors = { ...errors };

    // Validate each input field
    switch (name) {
      case 'username':
        newErrors.username = value.length < 5 ? 'Username must be at least 5 characters long' : '';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        newErrors.email = !emailRegex.test(value) ? 'Invalid email address' : '';
        break;
      case 'phone':
        const phoneRegex = /^[0-9]{10}$/;
        newErrors.phone = !phoneRegex.test(value) ? 'Invalid phone number' : '';
        break;
      case 'password':
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
        newErrors.password = !passwordRegex.test(value) ? 'Password must be at least 6 characters long and contain at least one letter and one number' : '';
        break;
      case 'retypePassword':
        newErrors.retypePassword = value !== user.password ? 'Passwords do not match' : '';
        break;
      default:
        break;
    }

    // Update errors state
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if any of the fields are empty
    if (Object.values(user).some(value => value.trim() === '')) {
      // If any field is empty, set errors for all fields
      const emptyErrors = {};
      for (const key in user) {
        if (user[key].trim() === '') {
          emptyErrors[key] = 'This field is required';
        }
      }
      setErrors(emptyErrors);
      return;
    }
  
    // Check if there are any errors
    if (Object.values(errors).some(error => error !== '')) {
      return; // If there are errors, prevent form submission
    }
  
    // If no errors, proceed with signup
    try {
      const response = await fetch('http://localhost:8081/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
        credentials: 'include',
      });
  
      if (response.ok) {
        // Successful registration
        const result = await response.text();
        console.log(result);
        redirectToLogin();
      } else {
        // Handle error
        const errorResult = await response.json();
        console.error(errorResult);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };  

  return (
    <div style={backgroundStyle}>
      <div style={styles.container}>
        <div style={styles.imageContainer}>
          <img src={img} alt="Signup Login" style={styles.image} />
        </div>
        <div style={styles.formContainer}>
          <h2 style={styles.heading}>Sign Up</h2>
          <form style={styles.form} onSubmit={handleSubmit} noValidate>
            <div style={styles.formGroup}>
              <label style={styles.label}>Username:</label>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleInputChange}
                required
                style={styles.input}
                pattern=".{5,}"
              />
            </div>
            <p style={styles.error}>{errors.username}</p>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email:</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                required
                style={styles.input}
              />
            </div>
            <p style={styles.error}>{errors.email}</p>
            <div style={styles.formGroup}>
              <label style={styles.label}>Phone Number:</label>
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleInputChange}
                required
                style={styles.input}
                pattern="[0-9]{10}"
              />
            </div>
            <p style={styles.error}>{errors.phone}</p>
            <div style={styles.formGroup}>
              <label style={styles.label}>Password:</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
                required
                style={styles.input}
                pattern="(?=.*[A-Za-z])(?=.*\d).{6,}"
              />
            </div>
            <p style={styles.error}>{errors.password}</p>
            <div style={styles.formGroup}>
              <label style={styles.label}>Retype Password:</label>
              <input
                type="password"
                name="retypePassword"
                value={user.retypePassword}
                onChange={handleInputChange}
                required
                style={styles.input}
              />
            </div>
            <p style={styles.error}>{errors.retypePassword}</p>
            <button type="submit" style={styles.button}>Sign Up</button>
            <p style={{ color: 'black' }}>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
