
// import React, { useState } from 'react';
// import Navbar from './Navbar/Navbar';
// import Sidebar from './Sidebar/Sidebar';
// import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import Waiting from './waiting/Waitaing';
// import Products from './Products/Products'
// import Accounts from './Accounts/Accounts'
// import Employee_Page from './Employee_Page/Employee_Page';
// import Login_Signup from './Login_Signup/Login_Signup';
// import Page from './Page';
// function App() {

//   return (
//    <Page/>
//   );
// }

// export default App;
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './Context/Context'; // Import the AuthContextProvider
import LoginSignup from './Login_Signup/Login_Signup';
import EmployeePage from './Employee_Page/Employee_Page';
import Waiting from './waiting/Waitaing';
import Products from './Products/Products';
import Accounts from './Accounts/Accounts';
import Map from './Branches/Map';
import Posts from './Posts/Posts';
import Visits from './Visits/Visits';
import Prizes from './Prizes/Prizes';
import ChatWrapper from './Chat/ChatWrapper'; // Import ChatWrapper
import Transaction from './Transaction/Transaction';
import Invoices from './Invoices/Invoices';
import Profile from './Profile/Profile';

function App() {
  const [employeeId, setEmployeeId] = useState(null);

  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/Employee" element={<EmployeePage />}>
        <Route path="Profile" element={<Profile />} />

          <Route path="Branches" element={<Map />} />
          <Route path="waiting" element={<Waiting />} />
          <Route path="Products" element={<Products />} />
          <Route path="Accounts" element={<Accounts />} />
          <Route path="Posts" element={<Posts employeeId={employeeId} />} />
          <Route path="Visits" element={<Visits />} />
          <Route path="Prizes" element={<Prizes />} />
          <Route path="Chat" element={<ChatWrapper employeeId={employeeId}/>} />
          <Route path="Transaction" element={<Transaction />} />
          <Route path="Invoices" element={<Invoices />} />

        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
