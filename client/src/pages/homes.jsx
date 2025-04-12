import React from 'react'
import { userauthstore } from '../store/useauthstore'
import Navbar from '../components/navbar'
import Chart from '../components/chartpage'
import Header from '../components/header'
import Dashboard from '../components/dashboard'
import { switchpagestore } from '../store/switchpagestore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function home() {
  require( '../css/home.css')
  const { pages,ispagechanging } = switchpagestore()
  const { authuser }= userauthstore()
     if(authuser) { 
        return (
          <div className='body'>
          <Header/>
          <Navbar/>
          {ispagechanging ? <div><FontAwesomeIcon/></div>:
            <>
              {pages==='chart' && <Chart/> }
              {pages==='home' && <Dashboard/>}
            </>
          }
          
          </div>
        )
     }
}

export default home