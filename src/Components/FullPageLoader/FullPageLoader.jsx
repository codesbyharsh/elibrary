import React from 'react';
import './FullPageLoader.css'; // Import the CSS file

function FullPageLoader() {
  return (
    <div className="overlay loader-container">
      <div className="loader"></div>
      <p className="loading-text">Loading...</p>
    </div>
  );
}

export default FullPageLoader;
