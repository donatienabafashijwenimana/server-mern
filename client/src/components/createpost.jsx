import React,{useEffect, useState} from 'react'
import { userpoststore } from '../store/poststore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpider, faSpinner } from '@fortawesome/free-solid-svg-icons'

function Createpost() {
    require('../css/createpost.css')
    const [filepost, setfilepost] =useState(null)
    const [fileposttype, setfileposttype] = useState('null')
    const [posttext, setposttext] = useState('')
    const [isUploading, setIsUploading] =useState(false)

    const {userpost,sendpost,getpost,ispostloading} = userpoststore()

    useEffect(()=>{
        getpost()
    },[])

    const handlefilechange = async (e) => {
        const file = e.target.files[0]
          setfileposttype(file.type)
        if (file.size > 100*1024*1024) return alert('maximum file size is 20mb')
        if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                setfilepost(reader.result)
            }
        } else {
            alert('Please choose a valid image or video.')
        }
    }
    const handlesendpost = async (e) => {
        e.preventDefault()
        if ((posttext && posttext.length > 0) || filepost) {
            setIsUploading(true)
            try {
                await sendpost(posttext, filepost,fileposttype)
                setposttext('')
                setfilepost(null)
                setfileposttype(null)
            } catch (error) {
                console.error('Error sending post:', error)
            } finally {
                setIsUploading(false)
            }
        }
    }
  return (
    <div className='createpost-container'>
       {filepost && filepost.startsWith('data:image/') && <img src={filepost} alt="" className="file-posted" />}
       {filepost && filepost.startsWith('data:video/') && (
        <video controls className="file-posted">
          <source src={filepost} alt="" />
        </video>
       )}
        <textarea className="create-post-input" cols="29" rows="3" value={posttext} placeholder='Whats On Your Mind...'
        onChange={(e)=>setposttext(e.target.value)}/>
        <div style={{'display':'flex' ,gap:'1pc'}}>
            <label htmlFor="upload-post-file" className='uploadpost'>upload post
              <input type="file" id='upload-post-file' className="upload-post-input" onChange={handlefilechange} />
            </label>
            <button disabled={isUploading} className="send-post" onClick={handlesendpost}>
              {!ispostloading ? "send post" :<FontAwesomeIcon icon={faSpinner} spin />}
            </button>
        </div>
    </div>
  )
}

export default Createpost