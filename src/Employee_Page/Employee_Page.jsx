

import React, { useState } from 'react';

import Sidebar from '../Sidebar/Sidebar';
import { BrowserRouter as Router, Route,Routes, Switch, Redirect, useNavigate, useActionData } from 'react-router-dom';
import Waiting from '../waiting/Waitaing';
import Products from '../Products/Products'
import Accounts from '../Accounts/Accounts'
import Navbar from '../Navbar/Navbar';
import Map from "../Branches/Map"
import "./Employee.scss"
import Profile from '../Profile/Profile';
function Employee_Page() {
  const [showWaiting, setShowWaiting] = useState(false);
const[showProducts,setShowProducts]=useState(false);
const[showAccounts,setShowAccounts]=useState(false);
const[showBranches,setShowBranches]=useState(false);
const [showposts,setShowposts]=useState(false);
const [showvisits,setShowvisits]=useState(false);
const[showprizes,setShowPrizes]=useState(false);
const[showchats,setShowChats]=useState(false);
const[showtransaction,setShowtransaction]=useState(false);
const[showInvoices,setShowInvoices]=useState(false);
const[showprofile,setShowprofile]=useState(true);
const navigate = useNavigate();

  return (
    <div className="a">

<Navbar/>

      <Sidebar 
      setShowWaiting={setShowWaiting}
      setShowProducts={setShowProducts}
      setShowAccounts={setShowAccounts}
      setShowBranches={setShowBranches}
      setShowposts={setShowposts}
      setShowvisits={setShowvisits}
      setShowPrizes={setShowPrizes}
      setShowChats={setShowChats}
      setShowtransaction={setShowtransaction}
      setShowInvoices={setShowInvoices}
      setShowprofile={setShowprofile}
       />

      </div>
  );
}

export default Employee_Page

