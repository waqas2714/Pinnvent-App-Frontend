import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import Card from "../../components/card/Card";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateUser } from "../../services/authService";
import ChangePassword from "../../components/change password/ChangePassword";


const EditProfile = () => {
  const [isLoading, setIsloading] = useState(false);
  const user = useSelector(selectUser);
  const { email } = user;
  const navigate = useNavigate();
  useEffect(() => {
    if (!email) {
      navigate("/profile");
    }
  }, [email, navigate]);

  const initialState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo: user?.photo,
  };
  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };
  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };
  const saveProfile = async (e) => {
    e.preventDefault();
    setIsloading(true);

    try {
      if (
        profileImage &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/png" ||
          profileImage.type === "image/jpg")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", "dh4vbnhxm");
        image.append("upload_preset", "vvmht1iz");
        //Saving Image to Cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dh4vbnhxm/image/upload",
          {
            method: "post",
            body: image,
          }
        );
        var imgData = await response.json();
        var imgUrl = imgData.url.toString();
        console.log(imgData);
    }
      const formData = {
        name: profile?.name,
        photo: profileImage ? imgUrl : profile.photo,
        phone: profile?.phone,
        bio: profile?.bio,
      };
      const data = await updateUser(formData);
      console.log(data);
      setIsloading(false);
      toast.success("Updated successfully.");
      navigate('/profile')
    } catch (error) {
      setIsloading(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="profile --my2">
      {isLoading && <Loader />}
      <Card cardClass={"card --flex-dir-column"}>
        <span className="profile-photo">
          <img src={user?.photo} alt="Profile Picture" />
        </span>
        <form onSubmit={saveProfile} className="--form-control --m">
          <span className="profile-data">
            <p>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={profile?.name}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Email:</label>
              <input
                type="text"
                name="email"
                value={profile?.email}
                disabled
                onChange={handleInputChange}
              />
              <br />
              <code>Email cannot be changed.</code>
            </p>
            <p>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={profile?.phone}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Bio:</label>
              <textarea
                name="bio"
                value={profile?.bio}
                onChange={handleInputChange}
                cols="30"
                rows="10"
              ></textarea>
            </p>
            <p>
              <label>Photo:</label>
              <input type="file" name="image" onChange={handleImageChange} />
            </p>
          </span>

          <div>
            <button className="--btn --btn-primary" type="submit">
              Edit Profile
            </button>
          </div>
        </form>
      </Card>
      <br />
      <ChangePassword />
    </div>
  );
};

export default EditProfile;
