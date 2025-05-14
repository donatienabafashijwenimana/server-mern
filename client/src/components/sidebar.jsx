import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage} from '@fortawesome/free-solid-svg-icons';

import { userauthstore } from '../store/useauthstore';
import { userchartstore } from '../store/userchartstore';
import avatar from '../pic/avatar.png';

function Sidebar() {
    require( '../css/sidebar.css')
    const { authuser } = userauthstore();
    const { getusers, users, selecteduser, setselecteduser,lastmessages,getlastmessage,number_messagetoeachuser,
        statusmessagetoeachuser} = userchartstore();
    const [search, setSearch] = useState("");

    useEffect(() => {
        getusers();
    }, [users, getusers]);

     useEffect(()=>{
        users.forEach(user => {
            getlastmessage(user._id)
            statusmessagetoeachuser(user._id)
            
        });
     },[users,getlastmessage,statusmessagetoeachuser])
    return (
        <div className='sidebar-contatiner'>
            <h3>Contacts</h3>
            <input
                type="search"
                placeholder="Search Contact..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="all-user-sidebar-container">
                {users
                    .filter((Users) => Users._id !== authuser._id)
                    .filter((Users) =>
                        Users.fullname.toLowerCase().includes(search.toLowerCase())
                    )
                    .sort((a, b) => {
                        const lastMsgA = lastmessages[a._id]?.createdAt || 0;
                        const lastMsgB = lastmessages[b._id]?.createdAt || 0;
                        return new Date(lastMsgB) - new Date(lastMsgA);
                    })
                    .map((Users, index) => (
                        
                        <div
                            key={index}
                            className={selecteduser && selecteduser._id===Users._id?"single-user-sidebar-container selecteduser":"single-user-sidebar-container" }
                            onClick={async() =>{ setselecteduser(Users)
                                     }}>

                            <img src={Users.profilepic || avatar} alt="Profile" />
                            {/* <div className="user-online-status" /> */}
                            <div className="user-sidebar-detail">
                                <span>{Users.fullname}</span>
                                <small className={lastmessages[Users._id] && lastmessages[Users._id].receiverId===authuser._id ? 'user-sidebar-message-receive':'user-sidebar-message-send'}>
                                    {lastmessages[Users._id] && lastmessages[Users._id].images && <FontAwesomeIcon icon={faImage}/>}
                                    {lastmessages[Users._id] && lastmessages[Users._id].images ? 'image' : lastmessages[Users._id] && lastmessages[Users._id].text}
                                </small>
                                
                            </div>
                            {number_messagetoeachuser && number_messagetoeachuser[Users._id] > 0 && <div className='unread-status'>{number_messagetoeachuser[Users._id]}</div>}
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Sidebar;
