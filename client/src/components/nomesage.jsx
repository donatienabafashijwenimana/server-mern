import { faEnvelopeOpenText, faMessage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Nomesage() {
  return (
    <div className='nomessage-container'>
          <FontAwesomeIcon icon={faEnvelopeOpenText} className='icon'/>
          <span>!no message yet</span>
        </div>
  )
}

export default Nomesage