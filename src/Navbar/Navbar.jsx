import "./Navbar.scss";
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import Sidebar from "../Sidebar/Sidebar";
import Waiting from '../waiting/Waitaing'
import logoImage from '../images/logo1.png'; // Adjust the path based on the folder structure

const Navbar=()=>{

    return(
        <div>
        <div className="navbar">
<div className="left">
<img src={logoImage} alt="Logo" className="logoo" />
<div className="cashcore">
CASHCORE</div>
    <div className="search">
<input type='text'placeholder='Search ...' />
</div>
</div>

<div className="right">
<div className="icon">
    <div className="welcome">
         Mohammad khamalan!
    </div>
<NotificationsNoneOutlinedIcon/>
<LogoutIcon/>
</div>
<div>
    <img src="/Capture.PNG" alt="" className="profile" />
</div>

        </div>
    
        </div>
        </div>



    )
}
export default Navbar

