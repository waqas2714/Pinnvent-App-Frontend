import { useEffect } from "react";
import { getLoginStatus } from "../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_LOGIN } from "../redux/features/auth/authSlice";

const useRedirectLoggedoutUser = (path) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const redirectLoggedoutUser = async () => {
      const isLoggedIn = await getLoginStatus();
      dispatch(SET_LOGIN(isLoggedIn));
      if (!isLoggedIn) {
        toast.info("Session Expired, please login to continue.");
        navigate(path);
        return;
      }
    };
    redirectLoggedoutUser();
  }, [navigate,path,dispatch]);
};

export default useRedirectLoggedoutUser;
