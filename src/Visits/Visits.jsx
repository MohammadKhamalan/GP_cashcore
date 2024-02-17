import React, { useState, useEffect } from 'react';
import { makeRequest } from '../axios';
import './Visits.scss';
import { motion } from 'framer-motion';

function Visits() {
  const [visits, setVisits] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [visitCount, setVisitCount] = useState(1); // Initialize visit counter
  const [users, setUsers] = useState({}); // State to store user information {id: {name, email}}
  const variants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 1.5 }
  };
  

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const response = await makeRequest.get('/visits');
        setVisits(response.data);
      } catch (error) {
        console.error('Error fetching visits:', error);
      }
    };

    fetchVisits();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await makeRequest.get('/users');
        const usersData = response.data.reduce((acc, user) => {
          acc[user.user_id] = { name: user.name, email: user.email };
          return acc;
        }, {});
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
  };

  const handleDeleteVisit = async (visitId) => {
    try {
      const response = await makeRequest.delete(`/visits/${visitId}`);
      if (response.data.message === 'Visit deleted successfully') {
        const updatedVisits = visits.filter((visit) => visit.visit_id !== visitId);
        setVisits(updatedVisits);
      }
    } catch (error) {
      console.error('Error deleting visit:', error);
    }
  };

  const filteredVisits = selectedDate
    ? visits.filter((visit) => visit.visit_date.substring(0, 10) === selectedDate)
    : visits;

  return (
    <motion.div variants={variants} initial="initial" animate="animate" className="visits-container">
      <h1>All Visits</h1>
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        className="date-filter"
      />
      <motion.table className="visits-table">
        <thead>
          <tr>
            <th>Visit Count</th>
            <th>User ID</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Branch Name</th>
            <th>Visit Date</th>
            <th>Visit Purpose</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredVisits.length > 0 ? (
            filteredVisits.map((visit, index) => (
              <tr key={visit.visit_id}>
                <td>{visitCount + index}</td>
                <td>{visit.user_id}</td>
                <td>{users[visit.user_id]?.name}</td>
                <td>{users[visit.user_id]?.email}</td>
                <td>{visit.branch_name}</td>
                <td>{visit.visit_date}</td>
                <td>{visit.visit_purpose}</td>
                <td>
                  <motion.button
                    className="button"
                    onClick={() => handleDeleteVisit(visit.visit_id)}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                  >
                    Mark as Done
                  </motion.button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No visits found{selectedDate && ' for the selected date'}</td>
            </tr>
          )}
        </tbody>
      </motion.table>
    </motion.div>
  );
}

export default Visits;
