import React, { useState, useEffect } from 'react';
import { makeRequest } from '../axios';
import "./Accounts.scss"
import { motion } from 'framer-motion';

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await makeRequest.get('/accounts');
        if (response.status === 200) {
          console.log(response.data); // Log the response data
          setAccounts(response.data);
        } else {
          console.error('Failed to fetch accounts:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };
  
    fetchAccounts();
  }, []);
  const handleDelete = async (account_id) => {
    try {
      await makeRequest.delete(`/accounts/${account_id}`);
      const updatedResponse = await makeRequest.get('/accounts');
      setAccounts(updatedResponse.data);
    } catch (error) {
      console.error('Error deleting account:', error); // Log any errors that occur during deletion
    }
  };
  
  return (
    <motion.div
      className="account-background"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="account-list">
        <h1>Accounts</h1>
        <ul>
          {accounts.map(account => (
            <motion.li
            
              key={account.account_id}
              whileHover={{ translateY: -5, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)' }}
            >
              <p>User ID: {account.user_id}</p>
              <p>Email: {account.email}</p>
              <p>Phone Number: {account.phone_number}</p>
              <p>Account Type: {account.account_type}</p>
              <p>Account Balance: {account.account_balance}</p>
              <button className="delete-button" onClick={() => handleDelete(account.account_id)}>
                Delete
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default Accounts;
