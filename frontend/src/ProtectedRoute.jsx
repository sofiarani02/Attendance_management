import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => { // Fix: Props should be passed as an object

  const [decodedToken, setDecodedToken] = useState(null);

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
  }, []); 


  if (decodedToken){
    console.log("User Authenticated")
  }

  return children;
}

export default ProtectedRoute;
