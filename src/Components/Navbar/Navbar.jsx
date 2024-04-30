import React from 'react';
import './Navbar.css';
import { Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate component
import logo_light from '../../assets/logo-black.png';
import logo_dark from '../../assets/logo-white.png';
import search_icon_light from '../../assets/search-w.png';
import search_icon_dark from '../../assets/search-b.png';
import toggle_light from '../../assets/night.png';
import toggle_dark from '../../assets/day.png';
import { Link } from 'react-router-dom';

import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from '../../pages/LoginPage/firebase/config.js';
import { useDispatch } from 'react-redux';
import { setUser } from '../../pages/LoginPage/store/usersSlice.js';
import elibrary from '../../assets/elibrary.png'

import UploadPage from '../../pages/UploadPage/UploadPage.jsx';







const Navbar = ({ theme, setTheme  }) => {
  const dispatch = useDispatch();
  
 


  
  function handleSignOut() {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('userCredentials');
      signOut(auth).then(() => {
        dispatch(setUser(null));
      }).catch((error) => {
        console.log(error)
      });
    }
  }
  
  function scrollToFooter() {
    const footer = document.getElementById('footer');
    footer.scrollIntoView({ behavior: 'smooth' });
    
  }

 

const ADMIN = import.meta.env.VITE_ADMIN;



  const currentUser = auth.currentUser;
  const isAdmin = currentUser && currentUser.email === (ADMIN);

  // // Redirect to appropriate page after login
  // if (currentUser) {
  //   if (isAdmin) {
  //     if (window.location.pathname !== '/DeletePage') {
  //       window.location.href = '/DeletePage';
      
  //     }
  //   } else {
  //     if (window.location.pathname !== '/') {
  //       window.location.href = '/';
  //     }
  //   }
  // }

  return (
    <nav className={`navbar ${theme}`}>
      <div className='Navbar'>
        <img src={elibrary} className='logo-size'></img>
        <ul>
          {isAdmin ? (
            <>
              <li><Link to='/UploadPage'>Upload Book</Link></li>
              <li><Link to='/DeletePage'>Delete Book</Link></li>
            </>
           
          ) : (
            <>
              <li><Link to='/'>Home</Link></li>
              <li><a href='#' onClick={scrollToFooter}>About</a></li>
              <li><a href='#' onClick={scrollToFooter}>Contact</a></li>
            </>
          )}
        </ul>
        <img onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} src={theme === 'light' ? toggle_light : toggle_dark} alt='' className='toggle-icon' />
        <p className='email-user'> {auth.currentUser.email}</p>
        
        <button className='logout' onClick={handleSignOut}>Logout</button>
      </div>
      <Routes>
      {/* Redirect based on isAdmin */}
      {isAdmin ? 
      (
      <Route path="/" element={<Navigate to="/UploadPage"  />}  /> 
      )
      :
       (<Route path="*" element={<Navigate to="/" />} />)}
     
    </Routes>
    </nav>
  );
}

export default Navbar;
