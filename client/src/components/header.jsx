import { faShare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'


function Header() {
    require ('../css/header.css')
  return (
    <div className='header'>
        <FontAwesomeIcon icon={faShare} className='icon'/>
        <span>2Share</span>
    </div>

  )
}

export default Header