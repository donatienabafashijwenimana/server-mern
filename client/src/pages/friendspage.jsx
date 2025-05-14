import React,{useEffect} from 'react'
import avatar from '../pic/avatar.png'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import useFriendStore from '../store/friendshipstore'

function Friendspage() {
    require('../css/friends.css')

     const { user_suggest,officialfriends,requests,sendRequest, getSuggestions, acceptRequest,
          getRequest,rejectRequest,getofficialfriends } = useFriendStore()

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
    <div className='friend-page-container'>
        <div className="left-side-container">
            <div className="friend-title">official friends</div>
            <input type="search" className="search-friend-input" placeholder='Search Friend'/>
            {
            officialfriends.length === 0 ? (
                <div className="nosuggestion">
                <FontAwesomeIcon icon={faUserFriends} className="no-suggestion-icon" />
                <p className="nosuggestiontext">No friends that are official</p>
                </div>
            ) : (
                <div className="friend-list-container">
                {[...officialfriends]
                .sort((a, b) => new Date(b.mutualFriends) - new Date(a.mutualFriends))
                .map((friends) => (
                <div key={friends._id} className="friend-container">
                    <img 
                    src={friends.requester.profilepic || avatar} 
                    className="friend-pic" 
                    alt="Profile" 
                    />
                    <div className="friend-detail">
                    <div className="friend-names">{friends.requester.fullname}</div> 
                    <small className="friend-status">
                        {friends.mutualFriends || 0} mutual friends 
                    </small>
                    <div className="btn-cont">
                        <button 
                        className="friend-button reject-button"
                            onClick={() => rejectRequest(friends._id)}>Delete</button>
                    </div>
                    </div>
                </div>
                ))}
                </div>
            )}
        </div>


        <div className="mid-side-container">
            <div className="friend-title">friends suggestion</div>
            <input type="search" className="search-friend-input" />

            {requests.length === 0 ? (
                <div className="nosuggestion">
                <FontAwesomeIcon icon={faUserFriends} className="no-suggestion-icon" />
                <p className="nosuggestiontext">No friend Suggestion</p>
                </div>
            ) : (
                <div>
                {[...requests]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((req) => (
                <div key={req._id} className="friend-container">
                    <img 
                    src={req.requester.profilepic || avatar} 
                    className="friend-pic" 
                    alt="Profile" />
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
                ))}
                </div>
            )}
        </div>


        <div className="right-side-container">
            <div className="friend-title">people you may know</div>
            <input type="search" className="search-friend-input" placeholder='Search People'/>

            <div className="friend-list-container">
            {[...user_suggest]
            .sort((a,b)=> b.mutualFriends - a.mutualFriends)
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
  )}

export default Friendspage