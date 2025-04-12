import React from "react";
import { userchartstore } from '../store/userchartstore'
import { userauthstore } from '../store/useauthstore'
import Sidebar from './sidebar'
import Noselecteduser from './noselecteduser'
import Messagecontent from './Messagecontent'



function Chartpage() {
  require( '../css/chart.css')
  const {selecteduser } = userchartstore()
  const {authuser} = userauthstore()
  
  if(authuser){
    return (
      <div className='chart-body'>
        <Sidebar/>
        {selecteduser ? <Messagecontent/>:<Noselecteduser/>}
      </div>
    )
  }
}

export default Chartpage