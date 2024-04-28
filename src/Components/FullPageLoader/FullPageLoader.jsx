import React from 'react';
import './FullPageLoader.css'; // Import the CSS file

function FullPageLoader() {
  return (
    <div className="overlay loader-container">
    <center className='center-loader'>
      <div className="loader"></div>
      <p className="loading-text">Loading...</p>
      </center>
    </div>
  );
}

export default FullPageLoader;
