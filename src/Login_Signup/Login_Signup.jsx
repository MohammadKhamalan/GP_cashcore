import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; // Import BrowserRouter
import React, { useState,useEffect } from 'react';
import Login from '../Components/Login';
import Signup from '../Components/Signup';
import Overlay from '../Components/Overlay';
import '../Styles/App.scss';
import Loading from '../First/Logo';

function Login_Signup() {
  const [signIn, setSignIn] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const handleToggle = () => {
    setSignIn(!signIn);
  };

  useEffect(() => {
    // Simulate a 3-second loading period
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  const handleBackToLogin = () => {
    setSignIn(true);
  };
  
  return (
    <div className="container">
      {isLoading ? (
        <Loading /> // Show the Loading component during loading
      ) : (
        <div className="form-container">
          <Overlay show={signIn} handleSignIn={() => setSignIn(true)} handleSignUp={() => setSignIn(false)} />
          <div className={`form login ${signIn ? 'active' : ''}`}>
            <Login show={signIn} onToggle={handleToggle} />
          </div>
          <img src="logo1.png"  className="logo" />

          <div className={`form signup ${!signIn ? 'active' : ''}`}>
  <Signup show={!signIn} onToggle={handleToggle} onBackToLogin={handleBackToLogin} />
</div>

        </div>
      )}
    </div>
  );
}

export default Login_Signup;