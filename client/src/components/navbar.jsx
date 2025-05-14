import React, { useEffect } from 'react';
import { userauthstore } from '../store/useauthstore';
import avatar from '../pic/avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faHome ,faBars, faEnvelope, faUserFriends} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { switchpagestore } from '../store/switchpagestore';
import { userchartstore } from '../store/userchartstore';
import useFriendStore from '../store/friendshipstore';

function Navbar() {
    require('../css/navbar.css');

    const {setpage,setdisplaynotification} = switchpagestore()
    const {statusmessagenumber,fetchstatusmessage} = userchartstore()
    const {friendsuggestionnumber}=useFriendStore()
    const navigate = useNavigate()
    const { authuser } = userauthstore();

    // Example numbers for icons
    const iconNumbers = {
        home: 3,
        message: statusmessagenumber,
        bell: friendsuggestionnumber,
    };
    console.log(iconNumbers.bell)
    useEffect(()=>{
        fetchstatusmessage();
        const interval = setInterval(fetchstatusmessage, 1000); // refresh every 30s
        return () => clearInterval(interval); // cleanup
        },[fetchstatusmessage]);
    return (
        <div className="nav-container">
            <div className="nav-left">
                <img src={authuser.profilepic || avatar} alt="Profile" 
                onClick={e=>navigate('/profile')}/>
                <div className="name-status">
                    <span className="username">{authuser && authuser.fullname}</span>
                    <small className="status"><small className='status-dots'/> online</small>
                   
                </div>
            </div>
            <div className="nav-right">
                <div className="icon-container">
                    <FontAwesomeIcon className="icon" icon={faHome} 
                        onClick={(e)=>setpage('home')}/>
                </div>
                <div className="icon-container">
                    <FontAwesomeIcon className="icon" icon={faEnvelope} 
                    onClick={(e)=>{setpage('chart')}}/>
                    {iconNumbers.message>0 &&<span className="icon-number">{iconNumbers.message}</span>}
                </div>
                <div className="icon-container">
                    <FontAwesomeIcon className="icon" icon={faUserFriends} 
                    onClick={(e)=>{setpage('friend')}}/>
                    {iconNumbers.bell > 0 && <span className="icon-number">{iconNumbers.bell}</span>}
                </div>
                <div className="icon-container">
                    <FontAwesomeIcon className="icon" icon={faBell} onClick={(e)=>setdisplaynotification(true)}/>
                    <span className="icon-number">{iconNumbers.bell}</span>
                </div>
                <div className="icon-container">
                    <FontAwesomeIcon className="icon" icon={faBars}/>
                </div>
            </div>
        </div>
    );
}

export default Navbar;