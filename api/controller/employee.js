// // employee.js
// import { db } from '../connect.js'; // Import the db connection
// import bcrypt from 'bcrypt'; // Import bcrypt library
// import jwt from 'jsonwebtoken';

// export const addemployee = (req, res) => {
//     console.log(req.body); // Log the received data

//     const { employee_id, employee_name, password, email, phone_number, supervisor } = req.body;
//     const checkIfExistsQuery = "SELECT * FROM `employee` WHERE email = ?";
    
//     // Check if an employee with the same email already exists
//     db.query(checkIfExistsQuery, [email], (err, result) => {
//         if (err) return res.status(500).json(err);

//         if (result.length > 0) {
//             return res.status(400).json({ message: "Email already exists" });
//         } else {
//             // Hash the password before storing it
//             const salt = bcrypt.genSaltSync(10);
//             const hashedPassword = bcrypt.hashSync(password, salt);

//             const insertQuery = "INSERT INTO `employee` (employee_id, employee_name, password, email, phone_number, hire_date, supervisor) VALUES (?,?, ?, ?, ?, NOW(), ?)";
//             db.query(insertQuery, [employee_id, employee_name, hashedPassword, email, phone_number, supervisor === 0 ? false : true], (err, result) => {
//                 if (err) return res.status(500).json(err);
//                 return res.json({ message: "Employee added successfully" });
//             });
//         }
//     });
// };


// export const edit_employee = async (req, res) => {
//     const emp_id = req.params.id;
//     const { employee_name, password, email, phone_number, supervisor } = req.body;

//     try {
//         // Check if the new email already exists in the database
//         const checkIfExistsQuery = "SELECT * FROM `employee` WHERE email = ? AND employee_id != ?";
//         const result = await db.query(checkIfExistsQuery, [email, emp_id]);

//         if (result.length > 0) {
//             return res.status(400).json({ message: "Email already exists" });
//         }

//         let updateQuery, queryParams, hashedPassword;

//         if (password) {
//             const salt = bcrypt.genSaltSync(10);
//             hashedPassword = await bcrypt.hash(password, salt);

//             updateQuery = "UPDATE `employee` SET employee_name = ?, password = ?, email = ?, phone_number = ?, supervisor = ? WHERE employee_id = ?";
//             queryParams = [employee_name, hashedPassword, email, phone_number, supervisor === 0 ? false : true, emp_id];
//         } else {
//             updateQuery = "UPDATE `employee` SET employee_name = ?, email = ?, phone_number = ?, supervisor = ? WHERE employee_id = ?";
//             queryParams = [employee_name, email, phone_number, supervisor === 0 ? false : true, emp_id];
//         }

//         await db.query(updateQuery, queryParams);

//         // Check if the supervisor flag is updated to 1 and update employee_supervisor table accordingly
//         if (supervisor === 1) {
//             const updateSupervisorQuery = "UPDATE `employee_supervisor` SET supervisor_name = ?, phone_number = ?, email = ?, password = ? WHERE employee_id = ?";
//             await db.query(updateSupervisorQuery, [employee_name, phone_number, email, hashedPassword, emp_id]);
//         }

//         return res.json({ message: "Employee updated successfully" });
//     } catch (err) {
//         return res.status(500).json(err);
//     }
// };






// export const delete_employee=(req,res)=>{
  
//         const employee_id = req.params.id;
    
//         // Step 1: Delete from employee_supervisor table
//         const deleteEmployeeSupervisorQuery = "DELETE FROM employee_supervisor WHERE employee_id = ?";
//         db.query(deleteEmployeeSupervisorQuery, [employee_id], (err, result) => {
//             if (err) {
//                 return res.status(500).json(err);
//             }
    
//             // Step 2: Delete from employee table
//             const deleteEmployeeQuery = "DELETE FROM employee WHERE employee_id = ?";
//             db.query(deleteEmployeeQuery, [employee_id], (err, result) => {
//                 if (err) {
//                     return res.status(500).json(err);
//                 }
//                 if (result.affectedRows === 0) {
//                     return res.status(404).json({ message: "Employee not found" });
//                 }
//                 return res.json({ message: "Employee deleted successfully" });
//             });
//         });
    
    
// }


// export const loginEmployee = (req, res) => {
//     const q = "SELECT * FROM employee WHERE email = ?";
  
//     db.query(q, [req.body.email], async (err, data) => {
//         if (err) return res.status(500).json(err);
//         if (data.length === 0) return res.status(404).json("Employee not found!");

//         console.log('Data from DB:', data[0]); // Log the retrieved data

//         const hashedPasswordFromDB = data[0].password;
//         const userInputPassword = req.body.password.trim(); // Ensure userInputPassword is trimmed

//         console.log('Stored Hashed Password Length:', hashedPasswordFromDB.length);
//         console.log('User Input Password Length:', userInputPassword.length);

//         try {
//             const checkPassword = await bcrypt.compare(userInputPassword, hashedPasswordFromDB);

//             console.log('Check Password Result:', checkPassword);

//             if (!checkPassword) {
//                 return res.status(400).json("Wrong Password or Email");
//             }

//             const token = jwt.sign({ ID: data[0].employee_id }, "secretkey");

//             const { password, ...others } = data[0];

//             res.cookie("accessToken", token, {
//                 httpOnly: true,
//             }).status(200).json(others);
//         } catch (error) {
//             console.error(error);
//             return res.status(500).json("Error comparing passwords");
//         }
//     });
// };
// employee.js
import { db } from '../connect.js'; // Import the db connection
import bcrypt from 'bcrypt'; // Import bcrypt library
import jwt from 'jsonwebtoken';
import axios from "axios";

export const addemployee = async(req, res) => {
    const username = req.body.employee_name;
    console.log(req.body); // Log the received data
    try {
        const chatEngineResponse = await axios.put(
          "https://api.chatengine.io/users/",
          {
            username: username,
            secret: username,
            first_name: username
          },
          { headers: { "private-key": "a6e69ae3-b9cf-48d0-a3d4-80da2d564b01" } }
        );
        
    const { employee_id, employee_name, password, email, phone_number, supervisor } = req.body;
    const checkIfExistsQuery = "SELECT * FROM `employee` WHERE email = ?";
    
    // Check if an employee with the same email already exists
    db.query(checkIfExistsQuery, [email], (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        } else {
            // Hash the password before storing it
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            const insertQuery = "INSERT INTO `employee` (employee_id, employee_name, password, email, phone_number, hire_date, supervisor, employee_photo) VALUES (?, ?, ?, ?, ?, NOW(), ?, 'employee.PNG')";
            db.query(insertQuery, [employee_id, employee_name, hashedPassword, email, phone_number, supervisor === 0 ? false : true], (err, result) => {
                if (err) return res.status(500).json(err);
                return res.json({ message: "Employee added successfully" });
            });
        }
    });
} catch (e) {
    if (e.response) {
      return res.status(e.response.status).json(e.response.data);
    }
    console.log(e.response);
    return res.status(500).json({ message: "Server Error" });
  }
};
export const getEmployeeById = (req, res) => {
    const employee_id = req.params.employee_id; // Ensure this matches the parameter name in the route
    const query = "SELECT * FROM `employee` WHERE employee_id = ?";
    
    db.query(query, [employee_id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Employee not found" });
        }
        return res.json(result[0]);
    });
};


export const edit_employee = async (req, res) => {
    const empId = req.params.id;
    const updatedFields = req.body;
  
    try {
      if (Object.keys(updatedFields).length === 0) {
        return res.status(400).json({ message: "No fields provided for update" });
      }
  
      // Check if the employee ID is present in the update fields
      if (updatedFields.hasOwnProperty('employee_id')) {
        // Check if the new employee ID exists in the database
        const newEmployeeId = updatedFields.employee_id;
        const idExistsQuery = "SELECT * FROM employee WHERE employee_id = ?";
        const idExistsResult = await db.query(idExistsQuery, [newEmployeeId]);
  
        // If the new ID exists and it's different from the current ID, reject the update
        if (idExistsResult.length > 0 && newEmployeeId !== empId) {
          return res.status(400).json({ message: "Employee ID already exists" });
        }
      }
  
      const { supervisor, password, ...employeeFields } = updatedFields;
  
      if (employeeFields.email) {
        const emailExistsQuery = "SELECT * FROM employee WHERE email = ? AND employee_id != ?";
        const emailResult = await db.query(emailExistsQuery, [employeeFields.email, empId]);
  
        if (emailResult.length > 0) {
          return res.status(400).json({ message: "Email already exists" });
        }
      }
  
      // Encrypt the updated password before updating the database
      let hashedPassword = password;
      if (password) {
        const salt = bcrypt.genSaltSync(10);
        hashedPassword = await bcrypt.hash(password, salt);
      }
  
      const updateFields = { ...employeeFields };
      if (hashedPassword) {
        updateFields.password = hashedPassword;
      }
  
      const updateEmployeeQuery = `UPDATE employee SET ? WHERE employee_id = ?`;
      await db.query(updateEmployeeQuery, [updateFields, empId]);
      if (supervisor === 1) {
        const supervisorExistsQuery = "SELECT * FROM employee_supervisor WHERE employee_id = ?";
        const supervisorExistsResult = await db.query(supervisorExistsQuery, [empId]);
  
        if (supervisorExistsResult.length === 0) {
          const insertSupervisorQuery = "INSERT INTO employee_supervisor (employee_id, supervisor_name, phone_number, password, email, supervisor_photo) VALUES (?, ?, ?, ?, ?, ?)";
          await db.query(insertSupervisorQuery, [empId, employeeFields.employee_name, employeeFields.phone_number, employeeFields.password, employeeFields.email, employeeFields.employee_photo]);
        } else {
          const updateSupervisorQuery = "UPDATE employee_supervisor SET supervisor_name = ?, phone_number = ?, password = ?, email = ?, supervisor_photo = ? WHERE employee_id = ?";
          await db.query(updateSupervisorQuery, [employeeFields.employee_name, employeeFields.phone_number, employeeFields.password, employeeFields.email, employeeFields.employee_photo, empId]);
        }
      } else {
        const deleteSupervisorQuery = "DELETE FROM employee_supervisor WHERE employee_id = ?";
        await db.query(deleteSupervisorQuery, [empId]);
      }
  
      return res.json({ message: "Employee fields updated successfully" });
    } catch (err) {
      return res.status(500).json({ message: "Error updating employee", error: err });
    }
  };
  
// export const edit_employee = async (req, res) => {
//     const emp_id = req.params.id;
//     const updatedFields = req.body;

//     if (Object.keys(updatedFields).length === 0) {
//         return res.status(400).json({ message: "No fields provided for update" });
//     }

//     if (updatedFields.hasOwnProperty('employee_id')) {
//         return res.status(400).json({ message: "Employee ID cannot be updated" });
//     }

//     const { supervisor, employee_name, password, email, phone_number, employee_photo } = updatedFields;

//     const checkExistingEmail = async () => {
//         try {
//             const emailExistsQuery = "SELECT * FROM employee WHERE email = ? AND employee_id != ?";
//             const emailResult = await db.query(emailExistsQuery, [email, emp_id]);

//             if (emailResult.length > 0) {
//                 return res.status(400).json({ message: "Email already exists" });
//             }

//             const updateQuery = `UPDATE employee SET ? WHERE employee_id = ?`;
//             await db.query(updateQuery, [updatedFields, emp_id]);

//             if (supervisor === 1) {
//                 const supervisorExistsQuery = "SELECT * FROM employee_supervisor WHERE employee_id = ?";
//                 const supervisorExistsResult = await db.query(supervisorExistsQuery, [emp_id]);

//                 if (supervisorExistsResult.length === 0) {
//                     const insertSupervisorQuery = "INSERT INTO employee_supervisor (employee_id, supervisor_name, phone_number, password, email, supervisor_photo) VALUES (?, ?, ?, ?, ?, ?)";
//                     await db.query(insertSupervisorQuery, [emp_id, employee_name, phone_number, password, email, employee_photo]);
//                 } else {
//                     const updateSupervisorQuery = "UPDATE employee_supervisor SET supervisor_name = ?, phone_number = ?, password = ?, email = ?, supervisor_photo = ? WHERE employee_id = ?";
//                     await db.query(updateSupervisorQuery, [employee_name, phone_number, password, email, employee_photo, emp_id]);
//                 }
//             } else {
//                 const deleteSupervisorQuery = "DELETE FROM employee_supervisor WHERE employee_id = ?";
//                 await db.query(deleteSupervisorQuery, [emp_id]);
//             }

//             return res.json({ message: "Employee fields updated successfully" });
//         } catch (err) {
//             return res.status(500).json({ message: "Error updating employee", error: err });
//         }
//     };

//     if (email) {
//         await checkExistingEmail();
//     } else {
//         try {
//             const updateQuery = `UPDATE employee SET ? WHERE employee_id = ?`;
//             await db.query(updateQuery, [updatedFields, emp_id]);

//             if (supervisor === 1) {
//                 const supervisorExistsQuery = "SELECT * FROM employee_supervisor WHERE employee_id = ?";
//                 const supervisorExistsResult = await db.query(supervisorExistsQuery, [emp_id]);

//                 if (supervisorExistsResult.length === 0) {
//                     const insertSupervisorQuery = "INSERT INTO employee_supervisor (employee_id, supervisor_name, phone_number, password, email, supervisor_photo) VALUES (?, ?, ?, ?, ?, ?)";
//                     await db.query(insertSupervisorQuery, [emp_id, employee_name, phone_number, password, email, employee_photo]);
//                 } else {
//                     const updateSupervisorQuery = "UPDATE employee_supervisor SET supervisor_name = ?, phone_number = ?, password = ?, email = ?, supervisor_photo = ? WHERE employee_id = ?";
//                     await db.query(updateSupervisorQuery, [employee_name, phone_number, password, email, employee_photo, emp_id]);
//                 }
//             } else {
//                 const deleteSupervisorQuery = "DELETE FROM employee_supervisor WHERE employee_id = ?";
//                 await db.query(deleteSupervisorQuery, [emp_id]);
//             }

//             return res.json({ message: "Employee fields updated successfully" });
//         } catch (err) {
//             return res.status(500).json({ message: "Error updating employee", error: err });
//         }
//     }
// };









export const delete_employee=(req,res)=>{
  
        const employee_id = req.params.id;
    
        // Step 1: Delete from employee_supervisor table
        const deleteEmployeeSupervisorQuery = "DELETE FROM employee_supervisor WHERE employee_id = ?";
        db.query(deleteEmployeeSupervisorQuery, [employee_id], (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
    
            // Step 2: Delete from employee table
            const deleteEmployeeQuery = "DELETE FROM employee WHERE employee_id = ?";
            db.query(deleteEmployeeQuery, [employee_id], (err, result) => {
                if (err) {
                    return res.status(500).json(err);
                }
                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: "Employee not found" });
                }
                return res.json({ message: "Employee deleted successfully" });
            });
        });
    
    
}


export const loginEmployee = (req, res) => {
    const q = "SELECT * FROM employee WHERE email = ?";
  
    db.query(q, [req.body.email], async (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("Employee not found!");

        console.log('Data from DB:', data[0]); // Log the retrieved data

        const hashedPasswordFromDB = data[0].password;
        const userInputPassword = req.body.password.trim(); // Ensure userInputPassword is trimmed

        console.log('Stored Hashed Password Length:', hashedPasswordFromDB.length);
        console.log('User Input Password Length:', userInputPassword.length);

        try {
            const checkPassword = await bcrypt.compare(userInputPassword, hashedPasswordFromDB);

            console.log('Check Password Result:', checkPassword);

            if (!checkPassword) {
                return res.status(400).json("Wrong Password or Email");
            }

            const token = jwt.sign({ ID: data[0].employee_id }, "secretkey");

            const { password, ...others } = data[0];

            res.cookie("accessToken", token, {
                httpOnly: true,
            }).status(200).json(others);
        } catch (error) {
            console.error(error);
            return res.status(500).json("Error comparing passwords");
        }
    });
};


export const logout = (req, res) => {
    res.clearCookie("accessToken").json({ message: "Logged out successfully" });
  };
  



  