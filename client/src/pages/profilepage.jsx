import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash,faEye,faEdit, faSpinner } from '@fortawesome/free-solid-svg-icons';

import { userauthstore } from "../store/useauthstore";
import avatar from '../pic/avatar.png'

import Navbar from '../components/navbar'
require( '../css/signin-up.css')

function Profilepage() {
  require ( '../css/profilepage.css')
  const [selectedimage,setselectedimage]= useState(null)
  const [showpass,setshowpass]=useState(false)
  const [form_data, setFormData] = useState({
    fullname: '',
    email:'',
    password: '' 
  });
  const {updateprofile,isUpdateprofile}=userauthstore()

  const handlesubmit = async(e)=>{
    e.preventDefault()
    updateprofile(form_data)
  }

  const {authuser}= userauthstore()

  const handleuploadimage = (e)=>{
    // e.preventDefault()
    const image= e.target.files[0]
    if (!image) return;
    const reader = new FileReader();
    reader.readAsDataURL(image)
    reader.onload = async()=>{
      const base64Image = reader.result;
      setselectedimage(base64Image)
      await updateprofile({profilepic:base64Image})
      
    }
    
  }
  
  
  return (
    <div>
      <Navbar/>
      <form className="container container-profile" onSubmit={handlesubmit}>
        <div id="header">Your Profile</div>
        <div className="pic-section">
          <img src={selectedimage ||authuser.profilepic || avatar} alt="profile" id="profile-pic"/>
          <label htmlFor="upload_image">
            <FontAwesomeIcon icon={faEdit} className='camera-icon'/>
            <input type="file" name="profile_pic" id="upload_image" className='upload_image_input'
              onChange={handleuploadimage}/>
          </label>
          
        </div>
        <center><p>Tap on camera to change profile picture</p></center><br />
        <label htmlFor="username" className="l_username">full name/username</label>
        <input type="text" id="username" value={authuser.fullname || ''}
        onChange={(e) => setFormData({...form_data, fullname: e.target.value})}/>
        
        <label htmlFor="email" className="l_email">email</label>
        <input type="text" id="email" value={authuser.email || ''}
        onChange={(e) => setFormData({...form_data, email: e.target.value})}/>

        <label htmlFor="password" className="password">Password</label>
        <div className="pass">
            <input type={showpass ? 'text' :'password'} id="password" onChange={(e) => setFormData({...form_data, password: e.target.value})}/>
            <FontAwesomeIcon className='icon' onClick={(e)=>{
                            showpass ? setshowpass(false):setshowpass(true)}}
                            icon={showpass ? faEyeSlash : faEye} /> 
        </div>
        
        <button type="submit" value="edit" >{isUpdateprofile ? <FontAwesomeIcon icon={faSpinner}/> :'edit'}</button>
      </form>
    </div>
  );
}

export default Profilepage;
