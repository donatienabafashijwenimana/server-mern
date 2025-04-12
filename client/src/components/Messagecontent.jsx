import React, { useRef, useEffect, useState } from 'react';
import { userchartstore } from '../store/userchartstore';
import avatar from '../pic/avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faImage, faMicrophone, faPaperclip, faPaperPlane, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Nomesage from './nomesage';

const Messagecontent = () => {
    require('../css/Messagecontent.css');
    const {
        messages, ismessageloading, selecteduser,
        getmessage, sendmessage, fetchstatusmessage,listenForMessages
    } = userchartstore();

    const [messagetext, setmessagetext] = useState('');
    const [image, setimage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const messageEndRef = useRef(null);
    const messageContainerRef = useRef(null);

    const handlesendmessage = async (e) => {
        e.preventDefault();
        if ((messagetext && messagetext.length > 0) || image) {
            setIsUploading(true);
            try {
                await sendmessage(selecteduser._id, messagetext, image);
                setmessagetext('');
                setimage(null);
            } catch (error) {
                console.error('Error sending message:', error);
            } finally {
                setIsUploading(false);
            }
        }
    };

    useEffect(() => {
        if (selecteduser?._id) {
            getmessage();
        }
    }, [selecteduser._id]);

    useEffect(() => {
        fetchstatusmessage();
    }, [selecteduser]);
    useEffect(() => {
        listenForMessages();
    }, []);
    // AUTO SCROLL TO BOTTOM
    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleimagechange = async (e) => {
        const Image = e.target.files[0];
        if (!Image.type.startsWith('image/')) {
            alert('Please choose a valid image.');
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(Image);
        reader.onload = () => {
            setimage(reader.result);
        };
    };

    const removeimagesend = () => {
        setimage(null);
    };

    return (
        <div className='message-content-conatiner'>
            <div className="message-content-header">
                <img src={selecteduser.profilepic || avatar} alt="avatar" />
                <div className="message-header-detail">
                    <span>{selecteduser.fullname}</span>
                    <small>online</small>
                </div>
            </div>

            {/* MESSAGE SCROLL AREA */}
            <div className="message-content-message custom-scrollbar" ref={messageContainerRef}>
                {messages.length===0 ? <Nomesage/> :
                 messages.map((mess, index) => (
                    mess.images ?
                        <div key={index} className={selecteduser._id === mess.senderId ? "message-send image-message" : "message-receive image-message"}>
                            <img src={mess.images} alt='message' />
                            <p className="message">{mess.text}</p>
                            <small className="time">10:00</small>
                        </div> :
                        <div key={index} className={selecteduser._id === mess.senderId ? "message-send" : "message-receive"}>
                            <p className="message">{mess.text}</p>
                            <small className="time">10:00</small>
                        </div>
                ))}
                <div ref={messageEndRef} />
            </div>

            {image && (
                <div className="image-send-container">
                    <img src={image} className="selected-imege-send" alt='preview' />
                    <FontAwesomeIcon icon={faClose} className='remove-image' onClick={removeimagesend} />
                </div>
            )}

            <form onSubmit={handlesendmessage} className="message-field-center">
                <div className="icon-container">
                    <span>😊</span>
                    <FontAwesomeIcon icon={faPaperclip} />
                    <label htmlFor="input-image">
                        <FontAwesomeIcon icon={faImage} />
                        <input type="file" id="input-image" onChange={handleimagechange} />
                    </label>
                    <FontAwesomeIcon icon={faMicrophone} />
                </div>
                <input
                    type="text"
                    id="message-input"
                    value={messagetext}
                    placeholder='Type Message....'
                    onChange={e => setmessagetext(e.target.value)}
                />
                <button disabled={isUploading}>
                    {isUploading ? (
                        <FontAwesomeIcon icon={faSpinner} spin className='send-icon' />
                    ) : (
                        <FontAwesomeIcon icon={faPaperPlane} className='send-icon' />
                    )}
                </button>
            </form>
        </div>
    );
};

export default Messagecontent;
