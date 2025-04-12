import React, { useEffect } from 'react';
import { userauthstore } from '../store/useauthstore';
import avatar from '../pic/avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faHome ,faBars, faEnvelope, faUserFriends} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { switchpagestore } from '../store/switchpagestore';
import { userchartstore } from '../store/userchartstore';

function Navbar() {
    require('../css/navbar.css');

    const {setpage} = switchpagestore()
    const {statusmessagenumber,fetchstatusmessage} = userchartstore()
    const navigate = useNavigate()
    const { authuser } = userauthstore();

    // Example numbers for icons
    const iconNumbers = {
        home: 3,
        message: statusmessagenumber,
        bell: 2,
    };

    useEffect(()=>{
        fetchstatusmessage();
        const interval = setInterval(fetchstatusmessage, 1000); // refresh every 30s
        return () => clearInterval(interval); // cleanup
        },[]);
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
                    onClick={(e)=>{setpage('chart')}}/>
                    <span className="icon-number">{iconNumbers.message}</span>
                </div>
                <div className="icon-container">
                    <FontAwesomeIcon className="icon" icon={faBell} />
                    <span className="icon-number">{iconNumbers.home}</span>
                </div>
                <div className="icon-container">
                    <FontAwesomeIcon className="icon" icon={faBars} />
                </div>
            </div>
        </div>
    );
}

export default Navbar;