import React, { useState, useEffect } from 'react';
import './Logo.scss';

const Loading = ({ onFinishLoading }) => {
  return (
    <div className="load">
    <div className="loading-screen centered-image-container">
      
      <img src="logo1.png" alt="Logo" className="centered-image" />
    </div>
    </div>
  );
};

export default Loading;
