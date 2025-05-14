import { faBell, faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import avatar from '../pic/avatar.png';
import { switchpagestore } from '../store/switchpagestore';

function Notificationpage() {
    require('../css/notification.css')

    const {setdisplaynotification} = switchpagestore()
  return (
    <div className='notification-container'>
        <div className="notification-top">
            <div className="notification-title">
                <FontAwesomeIcon icon={faBell} className='notification-title-icon'/> Notification
            </div>
            <FontAwesomeIcon icon={faClose} className='notification-close-icon'
                             onClick={(e)=>setdisplaynotification(false)}/>
        </div>
        <div className="notification-content-container">
            <div className="notification-card">
                <img src={avatar} className="notification-pic" alt=''/>
                <div className="notification-text">damour liked your status</div>
            </div>
        </div>
    </div>
  )
}

export default Notificationpage