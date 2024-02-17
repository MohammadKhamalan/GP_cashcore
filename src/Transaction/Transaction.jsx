import React, { useState, useEffect } from 'react';
import './Transaction.scss';
import { makeRequest } from '../axios';
import { motion } from 'framer-motion'; // Import motion from Framer Motion

function Transaction() {
    const [accountId, setAccountId] = useState('');
    const [amount, setAmount] = useState('');
    const [result, setResult] = useState(null);
    const [interactions, setInteractions] = useState([]);
    const [filteredInteractions, setFilteredInteractions] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
  
    const fetchInteractions = async () => {
      try {
        const response = await makeRequest.get(`/user_branches`);
        const data = response.data;
        console.log('All User Branches:', data);
        setInteractions(data);
        setFilteredInteractions(data);
      } catch (error) {
        console.error('Error fetching interactions:', error);
      }
    };
  
    useEffect(() => {
      fetchInteractions();
    }, []);
  
    const handleInputChange = (e) => {
      const inputAccountId = e.target.value;
      setAccountId(inputAccountId);
  
      const filtered = interactions.filter(
        (interaction) => inputAccountId === '' || interaction.account_id.toString() === inputAccountId
      );
      setFilteredInteractions(filtered);
    };
  
    const handleCloseDetails = () => {
      setShowDetails(false);
    };
   
    const handleSearch = async () => {
      try {
        console.log('Searching...');
        const response = await makeRequest.get(`/user_branches/${accountId}`);
        const data = response.data;
        console.log('Search Result:', data);
        setResult(data);
        setShowDetails(true);
      } catch (error) {
        console.error('Error fetching account data:', error);
        setResult(null);
        setShowDetails(false);
      }
    };
  
  const handleTransaction = async (transactionType) => {
    console.log('Transaction button clicked with type:', transactionType);

    const body = {
      account_id: accountId,
      interaction_amount: amount,
      interaction_type: transactionType, // This parameter should distinguish between withdrawal (0) and deposit (1)
    };
  
    try {
      const response = await makeRequest.post('/user_branches', body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = response.data;
      console.log('Transaction response:', data);
    } catch (error) {
      console.error('Error performing transaction:', error);
    }
  };

  
  return (
    <motion.div className="transaction-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.h2 initial={{ y: -50 }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 120 }}>
        Account Transaction
      </motion.h2>
      <div className="input-section">
        <input
          className="input-field"
          type="text"
          placeholder="Enter Account ID"
          value={accountId}
          onChange={(e) => {
            setAccountId(e.target.value);
            setShowDetails(false); // Hide details box on input change
            console.log('Account ID:', e.target.value);
          }}
        />
        <motion.button className="search-btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleSearch}>
          Search Account
        </motion.button>
      </div>
      {
  accountId && (
    <motion.table className="interactions-table" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <thead>
        <tr>
          <th>Interaction ID</th>
          <th>User ID</th>
          <th>Account ID</th>
          <th>Interaction Date</th>
          <th>Interaction Type</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {interactions
          .filter((interaction) => accountId === '' || interaction.account_id.toString() === accountId)
          .map((filteredInteraction) => (
            <motion.tr key={filteredInteraction.interaction_id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Render table rows with filtered interactions */}
              <td>{filteredInteraction.interaction_id}</td>
              <td>{filteredInteraction.user_id}</td>
              <td>{filteredInteraction.account_id}</td>
              <td>{filteredInteraction.interaction_date}</td>
              <td>{filteredInteraction.interaction_type === 0 ? 'Withdrawal' : 'Deposit'}</td>
              <td>{filteredInteraction.interaction_amount + " $"}</td>
            </motion.tr>
          ))}
      </tbody>
    </motion.table>
  )
}


{!accountId && (
  <motion.div className="explanation-boxes">
    <motion.div
      className="explanation1-box"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p>By entering an Account ID, you can view all interactions related to this account in the table below.</p>
    </motion.div>
    <motion.div
      className="explanation2-box"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p>when enter account id and click to search it , the information about this account is render, The Deposit button allows you to perform a deposit transaction for the selected account.</p>
    </motion.div>
    <motion.div
      className="explanation3-box"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p>when enter account id and click to search it , the information about this account is render,The Withdraw button enables you to execute a withdrawal transaction for the chosen account.</p>
    </motion.div>
  </motion.div>
)}




      {showDetails && result && (
        <motion.div className="account-details" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p>Account ID: {result.length > 0 && result[0].account_id}</p>
          <p>Email: {result.length > 0 && result[0].email}</p>
          <p>Phone Number: {result.length > 0 && result[0].phone_number}</p>
          <p>Account Balance: {result.length > 0 && result[0].account_balance}</p>
          <p>Birthdate: {result.length > 0 && new Date(result[0].birthdate).toLocaleDateString()}</p>
          <div className="transaction-buttons">
            <input
              className="input-field"
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <motion.button
              className="transaction-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCloseDetails}
            >
              Close
            </motion.button>
            <motion.button
              className="transaction-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                console.log('Withdraw button clicked');
                handleTransaction(0);
              }}
            >
              Withdraw
            </motion.button>
            <motion.button
              className="transaction-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                console.log('Deposit button clicked');
                handleTransaction(1);
              }}
            >
              Deposit
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Transaction;
