import React, { useState } from 'react'
import "./auth.css"
import {BiLogIn} from "react-icons/bi"
import Card from '../../components/card/Card'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser, validateEmail } from '../../services/authService'
import { toast } from 'react-toastify'
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice'
import Loader from '../../components/loader/Loader'

const initialState={
    email:"",
    password:""
}
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading,setIsloading] = useState(false);
    const [formData,setFormData] = useState(initialState);
    const {email,password}=formData;

    const handleInputChange = (e)=>{
        const {name,value} = e.target;
        setFormData({...formData, [name] : value})
    }

    const login = async (e)=>{
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please provide input in all the fields.")
        }
        if (!validateEmail(email)) {
            toast.error("Provide a valid Email.")
        }
        const userData = {
            email,password
        }
        setIsloading(true);
        try {
            const data = await loginUser(userData);
            await dispatch(SET_LOGIN(true));
            await dispatch(SET_NAME(data.name));
            navigate("/dashboard");
            // console.log(data);
            setIsloading(false);
        } catch (error) {
            setIsloading(false);
        }
    }
  return (
    <div className="container auth">
        {isLoading && <Loader />}
        <Card>
            <div className="form">
                <div className="--flex-center">
                    <BiLogIn size={35} color="#999" />
                </div>
                <h2>Login</h2>
                <form onSubmit={login}>
                    <input type="email" placeholder='Email' required name='email' value={email} onChange={handleInputChange} />
                    <input type="password" placeholder='Password' required name='password' value={password} onChange={handleInputChange} />
                    <button type='submit' className='--btn --btn-primary --btn-block'>Login</button>
                </form>
                <Link to='/forgotPassword'>Forgot Password</Link>
                <span className="register">
                    <Link to='/'>Home</Link>
                    <p>&nbsp; Don't have an account? &nbsp;</p>
                    <Link to='/register'>Register</Link>
                </span>
            </div>
        </Card>
    </div>
  )
}

export default Login