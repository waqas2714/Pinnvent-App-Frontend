import React from "react";
import { RiProductHuntLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./Home.css";
import heroImg from "../../assets/inv-img.png";
import { ShowOnLoggedIn, ShowOnLoggedOut } from "../../components/protect/HiddenLinks";

const Home = () => {
  return (
    <div className="home">
      <nav className="container --flex-between">
        <div className="logo">
          <RiProductHuntLine size={35} />
        </div>
        <ul className="home-links">
          <ShowOnLoggedOut>
          <li>
            <Link to="/register">Register</Link>
          </li>
          </ShowOnLoggedOut>
          <ShowOnLoggedOut>
          <li>
            <button className="--btn --btn-primary">
              <Link to="/login">Login</Link>
            </button>
          </li>
          </ShowOnLoggedOut>
          <ShowOnLoggedIn>
          <li>
            <button className="--btn --btn-primary">
              <Link to="/dashboard">Dashboard</Link>
            </button>
          </li>
          </ShowOnLoggedIn>
        </ul>
      </nav>
      <section className="container hero">
        <div className="hero-text">
          <h2>Invenory {"&"} Stock Management Solution</h2>
          <p>
            Inventory system to control and managae products in realtime and
            integrated to make it easier to develop your business.
          </p>
          <div className="hero-buttons">
            <button className="--btn --btn-primary">
              <Link to="/dashboard">Free Trial 1 Month</Link>
            </button>
          </div>
          <div className="--flex-start">
            <numberText num="14K" text="Brand Owners"/>
            <numberText num="23K" text="Active Users"/>
            <numberText num="500+" text="Partners"/>
          </div>
        </div>
        <div className="hero-image">
            <img src={heroImg} alt="Inventory" />
        </div>
      </section>
    </div>
  );
};

const numberText = ({num,text})=>{
    return (
        <div className="--mr">
            <h3 className="--color-white">
                {num}
            </h3>
            <p className="--color-white">{text}</p>
        </div>
    )
} 
export default Home;
