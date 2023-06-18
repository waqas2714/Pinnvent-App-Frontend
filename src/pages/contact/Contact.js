import React, { useState } from 'react'
import './Contact.css'
import Card from '../../components/card/Card';
import {FaPhoneAlt, FaEnvelope, FaTwitter} from 'react-icons/fa'
import {GoLocation} from 'react-icons/go'
import axios from 'axios';
import { toast } from 'react-toastify';

const Contact = () => {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const data = {
        subject,
        message
    }
    const sendEmail = async (e)=>{
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/api/contactUs`,data)
            setMessage("");
            setSubject("");
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.message);
        }
    }
  return (
    <div className="contact">
        <h3 className="--mt">Contact Us</h3>
        <div className="section">
            <form onSubmit={sendEmail}>
                <Card cardClass="card" >
                    <label >Subject</label>
                    <input type="text" name='subject' placeholder='Subject' required value={subject} onChange={(e)=>setSubject(e.target.value)} />
                    <label >Message</label>
                    <textarea name="message" cols="30" rows="10" required value={message} onChange={(e)=>setMessage(e.target.value)}></textarea>
                    <button className="--btn --btn-primary">Send Message</button>
                </Card>
            </form>
            <div className="details">
                <Card cardClass="card2">
                    <h3>Our Contact Information</h3>
                    <p>Fill the form or contat us via other channels listed below.</p>
                    <div className="icons">
                        <span>
                            <FaPhoneAlt />
                            <p>0333-5937264</p>
                        </span>
                        <span>
                            <FaEnvelope />
                            <p>waqas@gmail.com</p>
                        </span>
                        <span>
                            <GoLocation />
                            <p>Islamabad, Pakistan</p>
                        </span>
                        <span>
                            <FaTwitter />
                            <p>@WaqasAli</p>
                        </span>
                    </div>
                </Card>
            </div>
        </div>
    </div>
  )
}

export default Contact