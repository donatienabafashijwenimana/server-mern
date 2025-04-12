import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash,faEye,faSpinner } from '@fortawesome/free-solid-svg-icons';

import { userauthstore } from "../store/useauthstore";

function Login() {
  require( '../css/signin-up.css')

  const [showpass,setshowpass]=useState(false)
  const [form_data, setFormData] = useState({
    username: '',
    password: '' 
  });
  const {login,isLogin}=userauthstore()
  const handlesubmit = (e)=>{
    e.preventDefault()
    login(form_data)
  }
  return (
    <div>
      <form className="container" onSubmit={handlesubmit}>
        <div id="header">Sign in</div>
        <label htmlFor="username" className="username">username</label>
        <input type='text' id="usename" onChange={e=>setFormData({...form_data,username:e.target.value})}/>
        <label htmlFor="password" className="password">password</label>
        <div className="pass">
            <input type={showpass ? 'text' :'password'} id="password" onChange={(e) => setFormData({...form_data, password: e.target.value})}/>
            <FontAwesomeIcon className='icon' onClick={(e)=>{
                            showpass ? setshowpass(false):setshowpass(true)}}
                            icon={showpass ? faEyeSlash : faEye} /> 
        </div>
        <button type="submit" value="sign in" >{isLogin ?<FontAwesomeIcon icon={faSpinner}/>: 'Sign in'}</button>
        <small>I do't have account <b><a href="/register">sign up</a></b></small>
      </form>
    </div>
  )
}

export default Login
