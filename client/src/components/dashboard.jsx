import React from 'react'
import avatar from '../pic/avatar.png'
import avatar1 from '../pic/bb.png'
import avatar2 from '../pic/aa.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faComment, faEnvelope, faHeart, faHome, faPlusCircle,
          faShare, faTags, faThumbsDown, faThumbsUp, faUserFriends} from '@fortawesome/free-solid-svg-icons'
import { switchpagestore } from '../store/switchpagestore'
import {userauthstore} from '../store/useauthstore'
import Createpost from './createpost'

function Dashboard() {
 
  require('../css/dashboard.css')

  const{setpage}=switchpagestore()
  const{authuser}= userauthstore()
  
  return (
    <div className='dashboard'>
      <div className="dashboard-left-side">
        <div className="dashboard-button-container" onClick={()=>setpage('home')}>
          <FontAwesomeIcon icon={faHome}/>
          <span>Home</span>
        </div>
        <div className="dashboard-button-container"  onClick={()=>setpage('chart')}>
          <FontAwesomeIcon icon={faEnvelope}/>
          <span>Message</span>
        </div>
        <div className="dashboard-button-container">
          <FontAwesomeIcon icon={faUserFriends}/>
          <span>Frends</span>
        </div>
        <div className="dashboard-button-container">
          <FontAwesomeIcon icon={faPlusCircle}/>
          <span>Create post</span>
        </div>
        <div className="dashboard-button-container">
          <FontAwesomeIcon icon={faTags}/>
          <span>View post</span>
        </div>
        <div className="dashboard-button-container">
          <FontAwesomeIcon icon={faBell}/>
          <span>Notification</span>
        </div>
        <div className="profile-card">
          <img src={authuser && authuser.profilepic ? authuser.profilepic : avatar1} className="profile-avatar" />
          <h3 className="profile-name">{authuser.fullname}</h3>
          <h3 className="profile-name">{authuser.email}</h3>
          
          <div className="profile-stats">
            <span><strong>54</strong> Friends</span>
          </div>

          <div className="profile-actions">
            <button className="view-btn">View Profile</button>
          </div>
        </div>
        <Createpost/>
      </div>
      <div className="dashboard-center-content">
        <div className="top-image">
          <img src={avatar}  alt=""/>
          <img src={avatar1} alt=""/>
          <img src={avatar2} alt=""/>
          <img src={avatar1} alt=""/>
        </div>
        <div className="dashboard-post-container">
          <div className="dashboard-post-sender-container">
            <img src={avatar} alt="no" className='dashboard-post-sender-pic'/>
            <span className='dashboard-post-sender-names'>donatien</span>
          </div>
          <div className="dashboard-post-content-container">
            <div className="dashboard-post-content-text">sdughajdgshjks</div>
            <div className="dashboard-post-content-pic-container">
              <img src={avatar2} alt="" className='dashboard-post-content-pic'/>
            </div>
          </div>
          <div className="dashboard-post-feedback-container">
            <div className="post-feedback"><FontAwesomeIcon className='post-icon-feedback' icon={faShare}/>10</div>
            <div className="post-feedback"><FontAwesomeIcon className='post-icon-feedback' icon={faComment}/>10</div>
            <div className="post-feedback"><FontAwesomeIcon className='post-icon-feedback' icon={faThumbsUp}/>10</div>
            <div className="post-feedback"><FontAwesomeIcon className='post-icon-feedback' icon={faThumbsDown}/>10</div>
          </div>
          
        </div>
      </div>
      <div className="dashboard-right-side">
        <div className="dashboard-right-container1">
          <div className="dashboard-right-title">
            suggestion friends
          </div>
          <div className="friend-container">
            <img src={avatar} className="friend-pic"/>
            <div className="friend-detail">
              <div className="friend-names"> ineza ange</div>
              <small className="friend-status">3 matual friend</small>
              <button className="friend-button">accept</button>
            </div>
          </div>
          <div className="friend-container">
            <img src={avatar} className="friend-pic"/>
            <div className="friend-detail">
              <div className="friend-names"> ineza ange</div>
              <small className="friend-status">3 matual friend</small>
              <button className="friend-button">accept</button>
            </div>
          </div>
          <div className="friend-container">
            <img src={avatar} className="friend-pic"/>
            <div className="friend-detail">
              <div className="friend-names"> ineza ange</div>
              <small className="friend-status">3 matual friend</small>
              <button className="friend-button">accept</button>
            </div>
          </div>
          
        </div>
        <div className="dashboard-right-container2">
        <div className="dashboard-right-title">
            suggestion friends
          </div>
          <div className="friend-container">
            <img src={avatar} className="friend-pic"/>
            <div className="friend-detail">
              <div className="friend-names"> ineza ange</div>
              <small className="friend-status">3 matual friend</small>
              <button className="friend-button">request</button>
            </div>
          </div>
          <div className="friend-container">
            <img src={avatar} className="friend-pic"/>
            <div className="friend-detail">
              <div className="friend-names"> ineza ange</div>
              <small className="friend-status">3 matual friend</small>
              <button className="friend-button">request</button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Dashboard