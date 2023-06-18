import React, { useState } from 'react'
import "./auth.css"
import {TiUserAddOutline} from "react-icons/ti"
import Card from '../../components/card/Card'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerUser, validateEmail } from '../../services/authService'
import { useDispatch } from 'react-redux'
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice'
import Loader from '../../components/loader/Loader'

const initialState={
    name:"",
    email:"",
    password:"",
    password2:""
}
const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading,setIsloading] = useState(false);
    const [formData,setFormData] = useState(initialState);
    const {name,email,password,password2}=formData;
    
    const handleInputChange = (e)=>{
        const {name,value} = e.target;
        setFormData({...formData, [name] : value})
    }
    
    const register = async (e)=>{
        e.preventDefault();
        if (!name || !email || !password) {
            toast.error("Please provide input in all the fields.")
        }
        if (password.length < 6) {
            toast.error("Password must be more than 6 characters.")
        }
        if (!validateEmail(email)) {
            toast.error("Provide a valid Email.")
        }
        if (password!==password2) {
            toast.error("Password must match.")
        }
        console.log(formData);
        const userData = {
            name,email,password
        }
        setIsloading(true);
        try {
            const data = await registerUser(userData);
            await dispatch(SET_LOGIN(true));
            await dispatch(SET_NAME(data.name));
            navigate("/dashboard");
            // console.log(data);
            setIsloading(false);
        } catch (error) {
            setIsloading(false);
            console.log(error.message);
        }
    }
  return (
    <div className="container auth">
        {isLoading && <Loader />}
        <Card>
            <div className="form">
                <div className="--flex-center">
                    <TiUserAddOutline size={35} color="#999" />
                </div>
                <h2>Register</h2>
                <form onSubmit={register}>
                    <input type="text" placeholder='Name' required name='name' value={name} onChange={handleInputChange} />
                    <input type="email" placeholder='Email' required name='email' value={email} onChange={handleInputChange}/>
                    <input type="password" placeholder='Password' required name='password' value={password} onChange={handleInputChange}/>
                    <input type="password" placeholder='Confirm Password' required name='password2' value={password2} onChange={handleInputChange}/>
                    <button type='submit' className='--btn --btn-primary --btn-block'>Login</button>
                </form>
                <span className="register">
                    <Link to='/'>Home</Link>
                    <p>&nbsp; Already have an account? &nbsp;</p>
                    <Link to='/login'>Login</Link>
                </span>
            </div>
        </Card>
    </div>
  )
}

export default Register