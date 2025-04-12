import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function noselecteduser() {
  require('../css/noselecteduser.css')
  return (
    <div className='noselecteduser-container'>
      <FontAwesomeIcon icon={faMessage} className='icon'/>
      <span>tap to people to make conversation...</span>
    </div>
  )
}

export default noselecteduser