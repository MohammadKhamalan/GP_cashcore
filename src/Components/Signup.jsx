import React, { useState } from 'react';
import '../Styles/Signup.scss';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import axios from 'axios';
import { makeRequest } from '../axios';

const Signup = ({ show, onToggle, onBackToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [id, setId] = useState('');
  const [phone, setPhone] = useState('');

  // State to hold error messages
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [idError, setIdError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // State to determine if there are errors
  const [isError, setIsError] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const pass = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/;
  const phoneRegex = /^\d{10}$/; // Assuming a 10-digit phone number
  const idregex = /^\d{9}$/;
  const validateEmail = (email) => emailRegex.test(email);
  const validatePassword = (password) => pass.test(password);
  const validatePhone = (phone) => phoneRegex.test(phone);
  const validateId = (id) => idregex.test(id);

  function validateName(name) {
    const fname = name.split(' ');
    return fname.length === 2 && /^[A-Za-z]+$/.test(fname[0]) && /^[A-Za-z]+$/.test(fname[1]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error messages
    setEmailError('');
    setNameError('');
    setPasswordError('');
    setIdError('');
    setPhoneError('');

    // Check if the inputs are valid
    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      isValid = false;
    }

    if (!validateName(name)) {
      setNameError('Invalid name');
      isValid = false;
    }

    if (!validatePassword(password)) {
      setPasswordError('invalid entry, make it harder');
      isValid = false;
    }

    if (!validatePhone(phone)) {
      setPhoneError('Invalid entry (10 digits required)');
      isValid = false;
    }

    if (!validateId(id)) {
      setIdError('Invalid Id number');
      isValid = false;
    }

    if (isValid) {
      try {
        const response = await makeRequest.post('http://localhost:8080/api/employee', {
          employee_id: id,
          employee_name: name,
          email: email,
          password: password,
          phone_number: phone,
          supervisor: 0, // Replace with your supervisor value
        });

        if (!response.data.message) {
          throw new Error('Error adding employee');
        }
        // Employee added successfully
        // Redirect or perform any action upon successful signup
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          const errorData = error.response.data;
          // Handle specific error messages from the backend
          if (errorData.message === 'Email already exists') {
            setEmailError(errorData.message);
          }
          // Log the error message for debugging
          console.error('Backend Error:', errorData.message);
        } else {
          // Handle general errors or show a generic error message
          console.error('Frontend Error:', error.message);
        }
      }
    } else {
      // Add a flag to indicate that there are errors
      setIsError(true);
    }
  };

  return (
    <div className={`signup-container ${show ? 'active' : ''}`}>
      {show && (
        <div>
          <h1 className="title">Sign up</h1>
          <img src="signup.PNG" alt="signup Image" />

          <form onSubmit={handleSubmit}>
            <div className={`input-container ${idError ? 'error' : ''}`}>
              <ContactsOutlinedIcon />
              <input
                type="text"
                placeholder="Id Number"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              />
            </div>
            <div className="err1">
              {idError && <span className="error-message">{idError}</span>}
            </div>
            <div className={`input-container ${nameError ? 'error' : ''}`}>
              <AccountCircleOutlinedIcon />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="err2">
              {nameError && <span className="error-message">{nameError}</span>}
            </div>
            <div className={`input-container ${emailError ? 'error' : ''}`}>
              <EmailOutlinedIcon />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="err3">
              {emailError && <span className="error-message">{emailError}</span>}
            </div>
            <div className={`input-container ${passwordError ? 'error' : ''}`}>
              <HttpsOutlinedIcon />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="err4">
              {passwordError && <span className="error-message">{passwordError}</span>}
            </div>
            <div className={`input-container ${phoneError ? 'error' : ''}`}>
              <LocalPhoneOutlinedIcon />
              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                className="p"
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="err">
              {phoneError && <span className="error-message">{phoneError}</span>}
            </div>
            <button type="submit" className="sign-button" onClick={handleSubmit}>
              Sign Up
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Signup;
