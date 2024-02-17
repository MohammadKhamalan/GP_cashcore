import React, { useState } from 'react';

import "./Sidebar.scss";
import { Link ,Outlet} from 'react-router-dom';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';
import TransferWithinAStationOutlinedIcon from '@mui/icons-material/TransferWithinAStationOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import logoImage from '../images/logo1.png'; // Adjust the path based on the folder structure
import Profile from '../Profile/Profile';

const Sidebar = ({ setShowWaiting,setShowProducts,setShowAccounts,setShowBranches,setShowposts,setShowvisits,setShowPrizes,setShowChats,setShowtransaction,setShowInvoices,setShowprofile }) => {
    const handleSetShowWaiting = () => {
        setShowWaiting(true);
        setShowProducts(false); // Reset other states
        setShowAccounts(false);
        setShowBranches(false);
    };
    const handleProfileClick = () => {
        setShowprofile(true);
      };
    const handleshowproducts = () => {
        setShowProducts(true);
        setShowWaiting(false);
        setShowAccounts(false);
        setShowBranches(false);
      };
      const handleshowaccounts = () => {
        setShowAccounts(true);
        setShowWaiting(false);
        setShowProducts(false); // Reset other states
        setShowBranches(false);
      };
      const handleSetShowBranches=()=>{
        setShowBranches(true);
        setShowWaiting(false);
        setShowProducts(false); // Reset other states
        setShowAccounts(false);
      };
const handleshowposts=()=>{
    setShowposts(true);
    setShowWaiting(false);
    setShowProducts(false); // Reset other states
    setShowAccounts(false);
    setShowBranches(false);
}
const handleshowvisits=()=>{
    setShowvisits(true);
    setShowposts(false);
    setShowWaiting(false);
    setShowProducts(false); // Reset other states
    setShowAccounts(false);
    setShowBranches(false);
}
const handleSetShowPrizes=()=>{
    setShowPrizes(true);
    setShowvisits(false);
    setShowposts(false);
    setShowWaiting(false);
    setShowProducts(false); // Reset other states
    setShowAccounts(false);
    setShowBranches(false);
}
const handleshowchats=()=>{
    setShowChats(true);
    setShowPrizes(false);
    setShowvisits(false);
    setShowposts(false);
    setShowWaiting(false);
    setShowProducts(false); // Reset other states
    setShowAccounts(false);
    setShowBranches(false);
}
const handleshowtransaction=()=>{
    setShowtransaction(true);
    setShowChats(false);
    setShowPrizes(false);
    setShowvisits(false);
    setShowposts(false);
    setShowWaiting(false);
    setShowProducts(false); // Reset other states
    setShowAccounts(false);
    setShowBranches(false);
}
const handleSetShowInvoices=()=>{
    setShowInvoices(true);
    setShowtransaction(false);
    setShowChats(false);
    setShowPrizes(false);
    setShowvisits(false);
    setShowposts(false);
    setShowWaiting(false);
    setShowProducts(false); // Reset other states
    setShowAccounts(false);
    setShowBranches(false);
}
const handleshowprofile=()=>{
    setShowprofile(true);
    setShowInvoices(false);
    setShowtransaction(false);
    setShowChats(false);
    setShowPrizes(false);
    setShowvisits(false);
    setShowposts(false);
    setShowWaiting(false);
    setShowProducts(false); // Reset other states
    setShowAccounts(false);
    setShowBranches(false);
}
    return (
        <>
        <div className="sidebar">
            <ul className="sidebar__list">
                <li className="sidebar__item">
                <Link to="/Employee/Profile" onClick={handleProfileClick}>
          

                    <HomeOutlinedIcon />
                    <span>Home</span>
                    </Link>
                </li>
                 <li className="sidebar__item">
                 <Link to="Accounts" onClick={handleshowaccounts}>

                    <AccountBoxOutlinedIcon />
                    <span>Accounts</span>
                    </Link>

                </li>
                <li className="sidebar__item">
                <Link to="Visits" onClick={handleshowvisits}>

                    <CalendarMonthOutlinedIcon />
                    <span>Visits</span>
                    </Link>

                </li>
                <li className="sidebar__item">
                <Link to="Chat" onClick={handleshowchats}>

                    <ChatBubbleOutlineOutlinedIcon />
                    <span>Chat</span>
                    </Link>
                </li>
                <li className="sidebar__item">
                <Link to="Posts" onClick={handleshowposts}>

                    <AddPhotoAlternateOutlinedIcon />
                    <span>Post</span>
                    </Link>
                </li> <li className="sidebar__item">
                <Link to="Products" onClick={handleshowproducts}>

                    <ProductionQuantityLimitsOutlinedIcon />
                    <span>Products</span>
                    </Link>
                </li> <li className="sidebar__item">
                <Link to="Transaction" onClick={handleshowtransaction}>

                    <TransferWithinAStationOutlinedIcon />
                    <span>Transaction</span>
                    </Link>
                    </li>
               
                <li className="sidebar__item">
                <Link to="waiting" onClick={handleSetShowWaiting}>
                <HourglassBottomOutlinedIcon/>
                <span>Waiting Accounts</span>
                </Link>


                </li>
                <li className="sidebar__item">
                <Link to="Prizes" onClick={handleSetShowPrizes}>
                    <EmojiEventsOutlinedIcon />
                    <span>Prizes</span>
                    </Link>
                </li> <li className="sidebar__item">
                <Link to="Branches" onClick={handleSetShowBranches}>

                    <AccountBalanceOutlinedIcon />
                    <span>Branches</span>
                    </Link>
                </li>
                <li className="sidebar__item">
                <Link to="Invoices" onClick={handleSetShowInvoices}>

                <DescriptionOutlinedIcon/>
                    <span>Invoices</span>
                    </Link>
                </li>
               
                <img src={logoImage} alt="Logo" className="logo" />
            </ul>
        </div>
        <Outlet/>
</>
    );
};

export default Sidebar;