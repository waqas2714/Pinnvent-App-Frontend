import React, { useEffect, useState } from 'react'
import './Profile.css'
import useRedirectLoggedoutUser from '../../Custom Hooks/useRedirectLoggedoutUser'
import { useDispatch } from 'react-redux';
import { getUser } from '../../services/authService';
import { SET_NAME, SET_USER } from '../../redux/features/auth/authSlice';
import { spinnerImage } from '../../components/loader/Loader';
import Card from '../../components/card/Card';
import { Link } from 'react-router-dom';


const Profile = () => {
    useRedirectLoggedoutUser('/login');
    const dispatch = useDispatch();
    const [profile, setProfile] = useState(null);
    const [isLoading,setIsLoading] = useState(false);

    useEffect(()=>{
        setIsLoading(true);
        async function getUserData(){
          const data = await getUser();
          console.log(data);
          setProfile(data);
          setIsLoading(false);
          await dispatch(SET_USER(data));
          await dispatch(SET_NAME(data.name));
        }
        getUserData();
    },[dispatch])
  return (
    <div className="profile --my2">
        {isLoading && <spinnerImage />}
        <>
            {!isLoading && profile===null ? ( <p>Something went wrong, please reload the page.</p> ): (
                <Card cardClass={"card --flex-dir-column"}>
                    <span className="profile-photo">
                        <img src={profile?.photo} alt="Profile Picture" />
                    </span>
                    <span className="profile-data">
                        <p><b>Name: </b>{profile?.name}</p>
                        <p><b>Email: </b>{profile?.email}</p>
                        <p><b>Phone: </b>{profile?.phone}</p>
                        <p><b>Bio: </b>{profile?.bio}</p>
                    </span>
                    <div>
                        <Link to="/editProfile">
                            <button className='--btn --btn-primary'>Edit Profile</button>
                        </Link>
                    </div>
                </Card>
            ) }
        </>
    </div>
  )
}

export default Profile