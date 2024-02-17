import React from 'react';
import '../Styles/Overlay.scss';
const Overlay = ({ show, handleSignIn, handleSignUp }) => {
  return (
    <div className={`overlay-container ${show ? 'active' : ''}`}>
      <div className="overlay">
        <div className="left-panel">
            <p className="paragraph">Please fill out the following fields to Sign Up:</p>
          <button className="ghost-button" onClick={handleSignIn}>
            Sign In
          </button>
        </div>
        <div className="right-panel">
          {show ? (
            <div>
            <h1 className="title">Hello!</h1>
            <p className="paragraph">      
            Don't have an account ?
            </p>
            <button className="ghost-button" onClick={handleSignUp}>
            Sign Up
          </button>
          </div>
          ) : (
            <div>
            <h1 className="title">Welcome Back!</h1>
            <p className="paragraph">
                Please fill out the following fields to Sign Up:
            </p>
            <button className="ghost-button" onClick={handleSignIn}>
            Sign in
          </button>
          
          
          </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Overlay;