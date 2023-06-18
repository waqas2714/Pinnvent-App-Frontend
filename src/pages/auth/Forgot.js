import React, { useState } from "react";
import "./auth.css";
import { AiOutlineMail } from "react-icons/ai";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";
import { forgotPassword, validateEmail } from "../../services/authService";
import { toast } from "react-toastify";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const forgot = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please provide Email.");
    }
    if (!validateEmail(email)) {
      toast.error("Provide a valid Email.");
    }
    const userData = {
      email,
    };
    await forgotPassword(userData);
    setEmail("");
  };
  return (
    <div className="container auth">
      <Card>
        <div className="form">
          <div className="--flex-center">
            <AiOutlineMail size={35} color="#999" />
          </div>
          <h2>Forgot Password</h2>
          <form onSubmit={forgot}>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Send Reset Email
            </button>
            <div className="links">
              <p>
                <Link to="/">- Home</Link>
              </p>
              <p>
                <Link to="/login">- Login</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Forgot;
