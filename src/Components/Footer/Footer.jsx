import '@fortawesome/fontawesome-free/css/all.css';
import React, { useState, useEffect } from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'; // Import a default profile icon
import { faUserCircle as faUserCircleLight } from '@fortawesome/free-solid-svg-icons'; // Import a light theme profile icon
import { faUserCircle as faUserCircleDark } from '@fortawesome/free-solid-svg-icons'; // Import a dark theme profile icon

const Footer = ({ theme, setTheme }) => {
  // State to manage the typed content
  const [typedContent, setTypedContent] = useState('');
  
  // Content to be typed
  const contentToType = "Welcome to our e-library! We're passionate about making knowledge accessible to everyone, everywhere. Our digital library is a hub for bookss on a wide range of topics. Whether you're a student, a professional, or just curious, our goal is to provide you with easy access to quality information. Join us on this journey of learning and discovery!";



  
  // Function to simulate typing effect
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      setTypedContent(contentToType.substring(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex === contentToType.length) {
        clearInterval(typingInterval);
      }
    }, 100); // Adjust typing speed here (milliseconds)
    return () => clearInterval(typingInterval); // Cleanup function to clear interval
  }, [contentToType]);

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Function to redirect to social media accounts
  const redirectToSocialMedia = (url) => {
    window.open(url, '_blank');
  };

  return (
    <footer id='footer' className={`footer ${theme}`}>
      <div className={`container-footer ${theme}`}>
        <div className="about">
          <h3>About Us</h3>
          <div className="about-content-container">
          <p className='aboutcontent'>{typedContent}</p>
        </div>
        </div>
        <div className="social-media">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <i className="fab fa-facebook" onClick={() => redirectToSocialMedia('https://www.facebook.com')}></i>
            <i className="fab fa-twitter" onClick={() => redirectToSocialMedia('https://twitter.com')}></i>
            <i className="fab fa-instagram" onClick={() => redirectToSocialMedia('https://www.instagram.com')}></i>
            <i className="fab fa-github" onClick={() => redirectToSocialMedia('https://github.com')}></i>
            <i className="fab fa-linkedin" onClick={() => redirectToSocialMedia('https://www.linkedin.com')}></i>
          </div>
        </div>
      </div>
      <div className="copyright">
        <p>&copy; eLibrary {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}

export default Footer;
