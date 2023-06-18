import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { useSelector } from "react-redux";

export const ShowOnLoggedIn = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (isLoggedIn) {
    return <>{children}</>;
  } else {
    return null;
  }
};

export const ShowOnLoggedOut = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (!isLoggedIn) {
    return <>{children}</>;
  } else {
    return null;
  }
};
