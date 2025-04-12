import React from 'react'

function Createpost() {
    require('../css/createpost.css')
  return (
    <div className='createpost-container'>
        <textarea className="create-post-input" cols="29" rows="3">Whats On Your Mind</textarea>
        <div style={{'display':'flex' ,gap:'1pc'}}>
            <label htmlFor="upload-post-file"><button className='uploadpost'>upload post</button>
              <input type="file" id='upload-post-file' className="upload-post-input" />
            </label>
            <button className="send-post">send post</button>
        </div>
    </div>
  )
}

export default Createpost