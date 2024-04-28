import { useState } from 'react';
import { auth } from './firebase/config.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail ,onAuthStateChanged} from "firebase/auth";
import './LoginPage.css';
import {useDispatch} from 'react-redux';

import {setUser} from './store/usersSlice.js';
import FullPageLoader from '../../Components/FullPageLoader/FullPageLoader.jsx'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function LoginPage() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [loginType, setLoginType] = useState('login');
  const [userCredentials, setUserCredentials] = useState({});
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser({id:user.uid ,email:user.email}));
      const uid = user.uid;
      
      // ...
    } else {
      dispatch(setUser(null));
    }
    if(isLoading)
    {
      setIsLoading(false);
    }

  });
  


  function handleCredentials(e) {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  }

  function handleSignup(e) {
    e.preventDefault();
    setError("");

    createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
    
      .catch((error) => {
        setError(error.message);
      });
  }

  function handleLogin(e) {
    e.preventDefault();
    setError("");

    signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
     
      .catch((error) => {
        setError(error.message);
      });
  }

  function handlePasswordReset() {
    const email = prompt('Please enter your email');
    if (email && isValidEmail(email)) {
        // Email is provided and valid, proceed with sending password reset email
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Password reset email sent, please check your inbox");
            })
            .catch((error) => {
                console.error("Error sending password reset email:", error);
                alert("An error occurred while sending the password reset email. Please try again later.");
            });
    } else {
        alert("Please enter a valid email address");
    }
}

function isValidEmail(email) {
    // Very basic email validation
    return /\S+@\S+\.\S+/.test(email);
}

  


  return (
    <>
      {isLoading && <FullPageLoader></FullPageLoader>}
      <div className="login-container">

    <div className="container2 login-page">
      <section className='section'>
      <div className='bg'>
        <h1 className='font-styling-h1'>Welcome to the elibrary</h1>
        <p>Login or create an account to continue</p>
        <div className="login-type">
          <button
            className={`btn ${loginType === 'login' ? 'selected' : ''}`}
            onClick={() => setLoginType('login')}>
            Login
          </button>
          <button
            className={`btn ${loginType === 'signup' ? 'selected' : ''}`}
            onClick={() => setLoginType('signup')}>
            Signup
          </button>
        </div>
        <form className="add-form login">
          <div className="form-control">
            <label className='margin-bottom-20px' >Email  <span style={{ color: 'red'}}>*&nbsp;</span></label>
            <input onChange={(e) => { handleCredentials(e) }} type="text" name="email" placeholder="Enter your email" />
          </div>
          <div className="form-control">
            <label className='margin-bottom-20px'>Password <span style={{ color: 'red'}}>*&nbsp;</span></label>
            <div className='pass-eye'>
            <input  onChange={(e) => { handleCredentials(e) }} type={showPassword ? 'text' : 'password'}
  name="password"
  placeholder="Enter your password"></input>
<span
  className="toggle-password"
  onClick={() => setShowPassword(!showPassword)}
>
  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
</span>
</div>

          </div>
          {loginType === 'login' ?
            <button onClick={(e) => { handleLogin(e) }} className="active btn btn-block log-sign">Login</button> :
            <button onClick={(e) => { handleSignup(e) }} className="active btn btn-block log-sign">Sign Up</button>
          }
          {error &&
            <div className="error">
              {error}
            </div>
          }
          <p onClick={handlePasswordReset} className="forgot-password">Forgot Password?</p>
        </form>
        </div>
      </section>
   
  </div>
</div>

    </>
  );
}

export default LoginPage;
