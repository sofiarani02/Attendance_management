import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const AboutContent = () => {
  return (
    <div style={{marginTop:"-227px", background: 'linear-gradient(to bottom, #FFC0CB, #FFFFFF)',}}> 
      <Navbar />
      <div style={{marginLeft:"100px", marginRight:"100px"}}>
        <h1 style={{marginLeft:"440px"}}>About Us</h1>
        <p>Welcome to ReactJS Tutorial! We are dedicated to providing quality resources and tutorials for learning React.js. Our mission is to make React.js accessible to everyone, from beginners to experienced developers.</p>
        <p>Whether you are looking to build your first React application or enhance your skills, we are here to help. Our tutorials cover a wide range of topics, including React fundamentals, state management, routing, and more.</p>
        <p>Thank you for choosing ReactJS Tutorial as your learning platform. Lets dive into the world of React together!</p>
      </div>
      <Link to="/contacts"><br /><br />
        <button style={{marginLeft:"560px"}} >Contact Us</button>
      </Link>
    </div>
  );
};

export default AboutContent;
