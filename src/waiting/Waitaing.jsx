
import { makeRequest } from '../axios';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Waiting.scss';

const Waiting = () => {
  const [lists, setLists] = useState([]);
  const [successMessageId, setSuccessMessageId] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await makeRequest.get('/waiting');
        setLists(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (waiting_id) => {
    try {
      // Call the delete endpoint based on the user_id
      await makeRequest.delete(`/waiting/${waiting_id}`);

      // Update the UI by fetching the updated waiting accounts list
      const updatedResponse = await makeRequest.get('/waiting');
      setLists(updatedResponse.data);
    } catch (error) {
      console.error('Error deleting waiting account:', error);
    }
  };
  const handleAccept = async (waitingId) => {
    try {
      const cashInputValue = document.getElementById(`cashInput${waitingId}`).value;
  
      // Validate cashInputValue
      if (!cashInputValue || isNaN(parseFloat(cashInputValue))) {
        console.error('Invalid cash input value');
        return;
      }
  
      const response = await makeRequest.get(`/waiting/${waitingId}`);
      const waitingAccount = response.data;
  
      // Make a request to insert the waiting account into the account table
      await makeRequest.post('/accounts', {
        // Pass the necessary waiting account details
        user_id: waitingAccount.user_id,
        email: waitingAccount.email,
        phone_number: waitingAccount.phone_number,
        password: waitingAccount.password,
        account_type: waitingAccount.accounttype,
        account_balance: cashInputValue,
        birthdate: waitingAccount.birthdate,
      });
      setSuccessMessageId(waitingId);

      // Delete the waiting account
      await makeRequest.delete(`/waiting/${waitingId}`);
  
      // Update the local state to refresh the displayed waiting accounts
      const updatedResponse = await makeRequest.get('/waiting');
      setLists(updatedResponse.data);
    } catch (error) {
      console.error('Error accepting waiting account:', error);
    }
  };
  return (
    <div className="home">
    {lists.length === 0 ? (
      <motion.div
        className="no-data-message"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p>No Waiting Accounts! 😕</p>
      </motion.div>
    ) : (      <motion.div className="waiting-account-list">
        {lists.map((waiting) => (
          <motion.div
            className="list"
            key={waiting.waiting_id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="details">
              <h3>Waiting ID: {waiting.waiting_id}</h3>
              <h3>User ID: {waiting.user_id}</h3>
              <div className="extra-details">
              <p>User Name: {waiting.name}</p>
              <p>Email: {waiting.email}</p>
              <p>Type of Account: {waiting.accounttype}</p>
                <div className="input-field">
                  <label htmlFor={`cashInput${waiting.waiting_id}`}>
                    Number of cash:
                  </label>
                  <input
                    type="text"
                    id={`cashInput${waiting.waiting_id}`}
                    placeholder="Enter number of cash"
                  />
                </div>
                <div className="buttons">
                  <button className="delete-buttn"
                                    onClick={() => handleDelete(waiting.waiting_id)} 

                  >Delete</button>
                  <button className="accept-button"
                    onClick={() => handleAccept(waiting.waiting_id)}

                  >Accept</button>
                </div>
                {successMessageId === waiting.waiting_id && (
                  <div className="success-message">Account added successfully!</div>
                )}
              </div>
             
            </div>
          </motion.div>
        ))}
      </motion.div>
    )}
    </div>
  );
};

export default Waiting;

