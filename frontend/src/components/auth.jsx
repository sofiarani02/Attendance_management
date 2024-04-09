// auth.js

import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const useAuthToken = () => {
  const [decodedToken, setDecodedToken] = useState(null);
  const [tokenValidity, setTokenValidity] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decoded = jwtDecode(token);
      const expirationTime = new Date(decoded.exp * 1000);
      const currentTime = new Date();
      const validityTime = expirationTime - currentTime;

      if (validityTime <= 0) {
        // Token is expired
        // You can handle token expiration here, like clearing localStorage or redirecting to login
        console.log('Token expired');
      } else {
        setDecodedToken(decoded);
        const minutes = Math.floor((validityTime / 1000 / 60) % 60);
        setTokenValidity(`${minutes} mins`);
      }
    } else {
      console.log('Token not found');
    }
  }, []);

  const updateDecodedToken = (newDecodedToken) => {
    setDecodedToken(newDecodedToken);
  };

  return { decodedToken, tokenValidity, updateDecodedToken };
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};
