import React, { useState, useEffect } from 'react';
import { makeRequest } from '../axios';
import './Profile.scss';
import logoImage from '../images/employee.PNG';
import { motion } from 'framer-motion';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

function Profile() {
  const [employee, setEmployee] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState({});
  const [fieldToEdit, setFieldToEdit] = useState('');
  const [isFieldInEditMode, setIsFieldInEditMode] = useState({});

  const fetchEmployeeData = async () => {
    try {
      const employeeId = localStorage.getItem('employeeId');
      const response = await makeRequest.get(`/employee/${employeeId}`);
      setEmployee(response.data);
      setIsFieldInEditMode(
        Object.keys(response.data).reduce((acc, key) => {
          acc[key] = false;
          return acc;
        }, {})
      );
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const handleEdit = async (key) => {
    try {
      const response = await makeRequest.put(`/employee/${employee.employee_id}`, { [key]: editedEmployee[key] });
      console.log(response.data);
      setIsFieldInEditMode({ ...isFieldInEditMode, [key]: false });
      fetchEmployeeData();
    } catch (error) {
      console.error('Error editing employee data:', error);
    }
  };

  const handleInputChange = (e, key) => {
    const { value } = e.target;
    setEditedEmployee((prevEditedEmployee) => ({
      ...prevEditedEmployee,
      [key]: value,
    }));
  };
  
  const enableEditMode = (key) => {
    setFieldToEdit(key);
    setEditMode(true);
    setIsFieldInEditMode({ ...isFieldInEditMode, [key]: true });
    setEditedEmployee({ ...employee });
  };

  return (
    <motion.div
      className="profile-container"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img src={logoImage} alt="Employee" className="em" />

      <div className="profile-info">
        {Object.keys(employee).map((key) => {
          if (key !== 'hire_date' && key !== 'supervisor' && key !== 'employee_photo') {
            return (
              <motion.div
                className="profile-field"
                key={key}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="flex-container">
                  {key === 'employee_id' && (
                    <span className="icon-wrapper">
                      <AccountCircleIcon style={{ marginRight: '5px', marginTop: '3px' }} />
                    </span>
                  )}
                  {key === 'email' && (
                    <span className="icon-wrapper">
                      <EmailIcon style={{ marginRight: '5px', marginTop: '3px' }} />
                    </span>
                  )}
                  {key === 'phone' && (
                    <span className="icon-wrapper">
                      <PhoneIcon style={{ marginRight: '5px', marginTop: '3px' }} />
                    </span>
                  )}
                  {key === 'employee_name' && (
                    <span className="icon-wrapper">
                      <BadgeIcon style={{ marginRight: '5px', marginTop: '3px' }} />
                    </span>
                  )}
                  {key === 'password' && (
                    <span className="icon-wrapper">
                      <LockOpenIcon style={{ marginRight: '5px', marginTop: '3px' }} />
                    </span>
                  )}
                  {key === 'phone_number' && (
                    <span className="icon-wrapper">
                      <LocalPhoneIcon style={{ marginRight: '5px', marginTop: '3px' }} />
                    </span>
                  )}
                  <span className="key">{key}</span>
                </h3>
                {isFieldInEditMode[key] ? (
                  key === 'password' ? (
                    <input
                      type="password"
                      name={key}
                      value={editedEmployee[key]}
                      onChange={(e) => handleInputChange(e, key)}
                    />
                  ) : (
                    <input
                      type="text"
                      name={key}
                      value={editedEmployee[key]}
                      onChange={(e) => handleInputChange(e, key)}
                    />
                  )
                ) : (
                  <p>{key === 'password' ? '********' : employee[key]}</p>
                )}
                {isFieldInEditMode[key] ? (
                  <button onClick={() => handleEdit(key)}>Save</button>
                ) : (
                  <button onClick={() => enableEditMode(key)}>Edit</button>
                )}
              </motion.div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </motion.div>
  );
}

export default Profile;
