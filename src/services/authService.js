import axios from "axios";
import {toast} from "react-toastify";
const BACKENDURL=process.env.BACKEND_URL_ENV;

//Register User 
export const registerUser = async (Data) =>{
    try {
       // const response = await axios.post(`${BACKENDURL}/api/users/register`, Data , {withCredentials:true});
       const response = await axios.post(" http://localhost:5000/api/users/register",Data,{withCredentials:true});
        if (response.statusText === "OK") {
            toast.success("User Registered Successfully!");
        }
        return response.data;
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message ||err.toString()
        toast.error(message);
    }
}

//Login User 
export const loginUser = async (Data) =>{
    try {
        // const response = await axios.post(`${BACKENDURL}/api/users/login`, Data , {withCredentials:true});
       const response = await axios.post(" http://localhost:5000/api/users/login",Data,);
       if (response.statusText === "OK") {
        toast.success("Login successful!");
    }
        return response.data;
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message ||err.toString()
        toast.error(message);
    }
}

//logout User 
export const logoutUser = async () =>{
    try {
        // const response = await axios.post(`${BACKENDURL}/api/users/login`, Data , {withCredentials:true});
       await axios.get(" http://localhost:5000/api/users/logout");
       toast.dark("Logged out Successfully.");
    }catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message ||err.toString()
        toast.error(message);
    }
}

//Forgot Password 
export const forgotPassword = async (userData) =>{
    try {
        // const response = await axios.post(`${BACKENDURL}/api/users/login`, Data , {withCredentials:true});
       await axios.post(" http://localhost:5000/api/users/forgotPassword",userData);
       toast.success("Email sent Successfully.");
    }catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message ||err.toString()
        toast.error(message);
    }
}

//Forgot Password 
export const resetPassword = async (userData, resetToken) =>{
    try {
        // const response = await axios.post(`${BACKENDURL}/api/users/login`, Data , {withCredentials:true});
       const response = await axios.put(`http://localhost:5000/api/users/resetPassword/${resetToken}`,userData);
       return response.data;
    }catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message ||err.toString()
        toast.error(message);
    }
}

//Get Login Status 
export const getLoginStatus = async () =>{
    try {
       const response = await axios.get(`http://localhost:5000/api/users/loggedIn`);
       return response.data;
    }catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message ||err.toString()
        toast.error(message);
    }
}

//Get User 
export const getUser = async () =>{
    try {
       const response = await axios.get(`http://localhost:5000/api/users/getUser`);
       return response.data;
    }catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message ||err.toString()
        toast.error(message);
    }
}

//Update User 
export const updateUser = async (data) =>{
    try {
       const response = await axios.patch(`http://localhost:5000/api/users/updateUser`,data);
       return response.data;
    }catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message ||err.toString()
        toast.error(message);
    }
}

//Change Password 
export const changePassword = async (data) =>{
    try {
       const response = await axios.patch(`http://localhost:5000/api/users/changePassword`,data);
       return response.data;
    }catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message ||err.toString()
        toast.error(message);
    }
}

export const validateEmail = (email) =>{
    return email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
}
