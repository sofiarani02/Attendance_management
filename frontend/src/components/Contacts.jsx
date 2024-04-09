import React from 'react';
import './Contact.css';
import Navbar from './Navbar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

function Contact() {
  return (
    // <div>
    //     <Sidebar/>
    //     <section className="Contact-page">
    //                 <h1>Contact</h1>
    //             </section>
    //   <Footer/>
    // </div>
    
    <div className='container' style={{  background: 'linear-gradient(to bottom, #FFC0CB, #FFFFFF)',  }}>
      <Navbar /> <br />
      <br />
      <br />
    
      <div className="contacts-container">
     
      <h2>Contact Information</h2> <br /><br />
      <div className="contact-details">
        <div className="contact-item">
          <FontAwesomeIcon icon={faFacebook} />
          <a href="https://www.facebook.com/example">Facebook</a>
        </div>
        <div className="contact-item">
          <FontAwesomeIcon icon={faTwitter} />
          <a href="https://twitter.com/example">Twitter</a>
        </div>
        <div className="contact-item">
          <FontAwesomeIcon icon={faInstagram} />
          <a href="https://www.instagram.com/example">Instagram</a>
        </div><br /><br />
        <div className="contact-item">
          <FontAwesomeIcon icon={faMapMarkerAlt} /><br />
          <span className="co">Our Official Address (Location)</span><br />
        </div>
        <div className="contact-item">
          <FontAwesomeIcon icon={faPhone} /><br />
          <span className="co">Contact Number: +1234567890</span>
        </div>
        <div className="contact-item">
          <FontAwesomeIcon icon={faEnvelope} /><br />
          <span className="co">Email: example@example.com</span>
        </div>
      </div>
    </div>
      </div>
    
  );
}

export default Contact;