// // Context.js
// import axios from "axios";
// import { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(
//     JSON.parse(localStorage.getItem("user")) || null
//   );

//   const login = async (inputlogin) => {
//     try {
//       const res = await axios.post(
//         "http://localhost:8080/api/employee/login",
//         inputlogin,
//         { withCredentials: true }
//       );
      
//       setCurrentUser(res.data);
//       console.log(res.data);
//     } catch (error) {
//       console.error("Login error:", error);
//     }
//   };

//   useEffect(() => {
//     localStorage.setItem("user", JSON.stringify(currentUser));
//   }, [currentUser]);

//   return (
//     <AuthContext.Provider value={{ currentUser, login }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// Context.js
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputlogin) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/employee/login",
        inputlogin,
        { withCredentials: true }
      );
      
      setCurrentUser(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
