import React, { useState } from 'react';

import { BrowserRouter ,Routes, Route, Switch, Redirect } from 'react-router-dom';
import Login_Signup from './Login_Signup/Login_Signup';
import Employee_Page from './Employee_Page/Employee_Page';
import Waiting from './waiting/Waitaing';
import Products from './Products/Products';
import Accounts from './Accounts/Accounts';
import Map from './Branches/Map';
import Posts from './Posts/Posts';
import Visits from './Visits/Visits';
import Prizes from './Prizes/Prizes';
import  Chat  from './Chat/ChatWrapper';
function Page() {
  const [employeeId, setEmployeeId] = useState(null);

  // Function to set employeeId after login
  const handleLogin = (id) => {
    setEmployeeId(id);
  };
  return (

<Routes>
    <Route path="/" element={<Login_Signup/>}/>
    <Route path="/Employee" element={<Employee_Page/>}>
    <Route path="Branches" element={<Map/>}>
          
          </Route>
        <Route path="waiting" element={<Waiting/>}>

        </Route>
        <Route path="Products" element={<Products/>}>
          
          </Route>
          <Route path="Accounts" element={<Accounts/>}>
          
          </Route>
          <Route path="Branches" element={<Map/>}>
          
          </Route>
          <Route path="Posts" element={<Posts employeeId={employeeId} />} />
          
          
          <Route path="Visits" element={<Visits/>}>
          
          </Route>
          <Route path="Prizes" element={<Prizes/>}>
          
          </Route>
          <Route path="Chat" element={<Chat/>}>
          
          </Route>
    
</Route>
</Routes>
    )
}

export default Page
