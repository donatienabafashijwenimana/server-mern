import React ,{useEffect} from 'react'
import avatar from '../pic/avatar.png'
import avatar1 from '../pic/bb.png'
import avatar2 from '../pic/aa.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faComment, faEnvelope, faHome,
          faShare, faTags, faThumbsDown, faThumbsUp, faUserFriends} from '@fortawesome/free-solid-svg-icons'
import { switchpagestore } from '../store/switchpagestore'
import {userauthstore} from '../store/useauthstore'
import Createpost from './createpost'
import { userpoststore } from '../store/poststore'
import useFriendStore from '../store/friendshipstore'
function Dashboard() {
 
  require('../css/dashboard.css')

  const{setpage}=switchpagestore()
  const{authuser}= userauthstore()
  const {userpost,likepost,dislikepost} = userpoststore()
  const { user_suggest,requests,sendRequest, getSuggestions, acceptRequest,
          getRequest,rejectRequest,officialfriendnumber,getofficialfriends } = useFriendStore()

  useEffect(() => {
    getSuggestions()
    getRequest()
    getofficialfriends()

    const interval = setInterval(() => {
      getSuggestions()
      getRequest()
      getofficialfriends()
    }, 1000);

    return () => clearInterval(interval);
  }, [getSuggestions,getofficialfriends,getRequest]);
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
        <div className="dashboard-button-container" onClick={()=>setpage('friend')}>
          <FontAwesomeIcon icon={faUserFriends}/>
          <span>Frends</span>
        </div>
        {/* <div className="dashboard-button-container">
          <FontAwesomeIcon icon={faPlusCircle}/>
          <span>Create post</span>
        </div> */}
        <div className="dashboard-button-container">
          <FontAwesomeIcon icon={faTags}/>
          <span>Post</span>
        </div>
        <div className="dashboard-button-container">
          <FontAwesomeIcon icon={faBell}/>
          <span>Notification</span>
        </div>
        <div className="profile-card">
          <img src={authuser && authuser.profilepic ? authuser.profilepic : avatar1} className="profile-avatar" alt=''/>
          <h3 className="profile-name">{authuser.fullname}</h3>
          <h3 className="profile-name">{authuser.email}</h3>
          
          <div className="profile-stats">
            <span><strong>{officialfriendnumber}</strong> Friends</span>
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
        
        {Array.isArray(userpost) && userpost.map((post, index) => (
          
        <div key={index} className="dashboard-post-container">
          <div className="dashboard-post-sender-container">
            <img src={post.author.profilepic} alt="no" className='dashboard-post-sender-pic'/>
            <span className='dashboard-post-sender-names'>{post.author.fullname}</span>
          </div>
          <div className="dashboard-post-content-container">
            {post.content && <div className="dashboard-post-content-text">{post.content}</div>}
            
            {post.postfile && <div className="dashboard-post-content-pic-container">
              {post.fileposttype.startsWith('image') && <img src={post.postfile } alt="" className='dashboard-post-content-pic'/>}
              {post.fileposttype.startsWith('video') && <video controls className='dashboard-post-content-pic'>
                <source src={post.postfile } alt=""/>
              </video>}
            </div>}
          </div>
          <div className="dashboard-post-feedback-container">
            <div className="post-feedback"><FontAwesomeIcon className='post-icon-feedback' icon={faShare}/>10</div>
            <div className="post-feedback"><FontAwesomeIcon className='post-icon-feedback' icon={faComment}/>10</div>
            <div className="post-feedback">
              <FontAwesomeIcon onClick={()=>likepost(post._id)}
              className={post.likedby.includes(authuser._id) ? 'post-icon-feedback post-icon-feedback-clicked'
                                                             :'post-icon-feedback'}
              icon={faThumbsUp}/>{post.likedby.length}
            </div>
            <div className="post-feedback">
              <FontAwesomeIcon onClick={()=>dislikepost(post._id)}
              className={post.dislikedby.includes(authuser._id) ? 'post-icon-feedback post-icon-feedback-clicked'
                                                             :'post-icon-feedback'}
              icon={faThumbsDown}/>{post.dislikedby.length}
            </div>
          </div>
          
        </div>
        ))}
      </div>
      <div className="dashboard-right-side">
        <div className="dashboard-right-container1">
          <div className="dashboard-right-title">
            Suggestion Friend
          </div>
          {requests.length === 0 ? (
              <div className="nosuggestion">
                <FontAwesomeIcon icon={faUserFriends} className="no-suggestion-icon" />
                <p className="nosuggestiontext">No friend Requests</p>
              </div>
            ) : (
              [...requests]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0,3).map((req) => (
                <div key={req._id} className="friend-container">
                  <img 
                    src={req.requester.profilepic || avatar} 
                    className="friend-pic" 
                    alt="Profile"/>
                  <div className="friend-detail">
                    <div className="friend-names">{req.requester.fullname}</div> 
                    <small className="friend-status">
                      {req.mutualFriends || 0} mutual friends 
                    </small>
                    <div className="btn-cont">
                      <button 
                        className="friend-button acept-button"
                          onClick={() => acceptRequest(req._id)}>Accept</button>
                      <button 
                        className="friend-button reject-button" 
                        onClick={() => rejectRequest(req._id)}>Reject</button>
                    </div>
                  </div>
                </div>
              ))
            )}
        </div>
        <div className="dashboard-right-container2">
        <div className="dashboard-right-title">
          People You May know
          </div>
          {user_suggest
          .sort((a,b)=> b.mutualFriends - a.mutualFriends)
          .slice(0,3)
          .map((friend) => (
          <div key={friend._id} className="friend-container">
            <img src={friend.profilepic || avatar} className="friend-pic" alt=''/>
            <div className="friend-detail">
              <div className="friend-names">{friend.fullname}</div>
              <small className="friend-status">{friend.mutualFriends || 0} mutual friends</small>
              <div className="btn-cont">
                {friend.hasPendingRequest ?
                <button className="friend-button pend" onClick={() => sendRequest(friend._id)}>pending...</button>:
                <button className="friend-button" onClick={() => sendRequest(friend._id)}>Request</button>
                }
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
      
    </div>
  )
}

export default Dashboard