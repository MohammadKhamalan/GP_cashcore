// import React, { useState } from "react";
// import "../Styles/Login.scss";
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import { makeRequest } from "../axios";
// import { Link, useNavigate } from "react-router-dom";

// const Login = ({ show, onToggle }) => {
//   const [email, setEmail] = useState("");
//   const navigate = useNavigate();
//   const [password, setPassword] = useState("");
//   const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//   const pass = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/;
//   const validateEmail = (email) => emailRegex.test(email);
//   const validatePassword = (password) => pass.test(password);
//   const [employeeId, setEmployeeId] = useState(null); // State to store employee_id

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     console.log("Handle Submit executed"); // Check if this message appears in the console

// //     if (!validateEmail(email)) {
// //       alert("Invalid email address");
// //       return;
// //     }

// //     if (!validatePassword(password)) {
// //       alert(
// //         "Password must contain at least 8 characters, one uppercase letter, and one number"
// //       );
// //       return;
// //     }
// //     try {
//       // const response = await makeRequest.post(
//       //   "http://localhost:8080/api/employee/login",
//       //   {
//       //     email: email,
//       //     password: password,
//       //   }
//       // );

// //       // Assuming the response contains user data after successful login
// //       if (response && response.status === 200) {
// //         // Redirect or perform necessary actions upon successful login
// //         const empId = response.data.employee_id;
// //         setEmployeeId(empId); // This sets the employeeId in the state
      
// //         // Pass the employeeId to the Posts component
// //         navigate("/Employee", { state: { employeeId: empId } });
// // }      } catch (error) {
// //       console.error("Login error:", error);
// //       // Handle login error, display error message, etc.
// //       alert("Login failed. Please try again.");
// //     }
// //   };
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!validateEmail(email)) {
//     alert("Invalid email address");
//     return;
//   }

//   if (!validatePassword(password)) {
//     alert("Password must contain at least 8 characters, one uppercase letter, and one number");
//     return;
//   }

//   try {
//     const response = await makeRequest.post('http://localhost:8080/api/employee/login', {
//       email: email,
//       password: password,
//     });

//     const employeeId = response.data.employee_id;
//     localStorage.setItem('employeeId', employeeId);
//     navigate("/Employee");
//   } catch (error) {
//     console.error("Login error:", error);
//     alert("Login failed. Please try again.");
//   }
// };



//   return (
//     <div className={`login-container ${show ? "active" : ""}`}>
//       <h1 className="title">Sign in</h1>
//       <img src="login.PNG" alt="Login Image" />{" "}
//       {/* Include the image directly */}
//       <form onSubmit={handleSubmit} className="for">
//         <div className="email">
//           <span className="em">
//             <EmailOutlinedIcon />
//           </span>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="pass">
//           <LockOutlinedIcon />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div className="forgot-password">
//           <a href="/forgot-password">Forgot Password?</a>
//           {/* Or use a button */}
//           {/* <button onClick={handleForgotPassword}>Forgot Password?</button> */}
//         </div>
//       </form>
//       <button type="submit" className="signin" onClick={handleSubmit}>
//         Sign In
//       </button>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useContext } from "react";
import "../Styles/Login.scss";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { AuthContext } from "../Context/Context"; // Import the AuthContext here
import { Link, useNavigate } from "react-router-dom";

const Login = ({ show, onToggle }) => {
  const { login } = useContext(AuthContext); // Access login function from context
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const pass = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/;
  const validateEmail = (email) => emailRegex.test(email);
  const validatePassword = (password) => pass.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert("Invalid email address");
      return;
    }

    if (!validatePassword(password)) {
      alert("Password must contain at least 8 characters, one uppercase letter, and one number");
      return;
    }

    try {
      // Use the login function from the context instead of making the axios request here
      await login({ email: email, password: password });

      // Upon successful login, navigate to the desired route
      navigate("/Employee");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
        <div className={`login-container ${show ? "active" : ""}`}>
          <h1 className="title">Sign in</h1>
          <img src="login.PNG" alt="Login Image" />{" "}
          {/* Include the image directly */}
          <form onSubmit={handleSubmit} className="for">
            <div className="email">
              <span className="em">
                <EmailOutlinedIcon />
              </span>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="pass">
              <LockOutlinedIcon />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="forgot-password">
              <a href="/forgot-password">Forgot Password?</a>
              {/* Or use a button */}
              {/* <button onClick={handleForgotPassword}>Forgot Password?</button> */}
            </div>
          </form>
          <button type="submit" className="signin" onClick={handleSubmit}>
            Sign In
          </button>
        </div>
      );
};

export default Login;

