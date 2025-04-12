import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash,faEye, faSpinner } from '@fortawesome/free-solid-svg-icons';

import { userauthstore } from "../store/useauthstore";

function Register() {
  require( '../css/signin-up.css')
  const [showpass,setshowpass]=useState(false)
  const [form_data, setFormData] = useState({
    fullname: '',
    email:'',
    password: '' 
  });
  const {signup,isSignup}=userauthstore()

  const handlesubmit = (e)=>{
    e.preventDefault()
    signup(form_data)
  }
  
  return (
    <div>
      <form className="container" onSubmit={handlesubmit}>
        <div id="header">Sign Up</div>

        <label htmlFor="username" className="l_username">full name/username</label>
        <input type="text" id="username" onChange={(e) => setFormData({...form_data, fullname: e.target.value})}/>
        
        <label htmlFor="username" className="l_email">email</label>
        <input type="text" id="username" onChange={(e) => setFormData({...form_data, email: e.target.value})}/>

        <label htmlFor="password" className="password">Password</label>
        <div className="pass">
            <input type={showpass ? 'text' :'password'} id="password" onChange={(e) => setFormData({...form_data, password: e.target.value})}/>
            <FontAwesomeIcon className='icon' onClick={(e)=>{
                            showpass ? setshowpass(false):setshowpass(true)}}
                            icon={showpass ? faEyeSlash : faEye} /> 
        </div>

        <button type="submit" value="Sign Up" >{isSignup? <FontAwesomeIcon icon={faSpinner} spin/>:'Sign Up'}</button>
        <small>I have an account <b><a href="/login">Login</a></b></small>
      </form>
    </div>
  );
}

export default Register;
