import React from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../../../assets/bg3.png";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();

  const handlePress = () => {
    navigate("/CategoryScreen");
  };

  return (
    <section className="hero">
      <div className="hero-text">
        <p className="hero-eyebrow">Freshly Roasted, Locally Loved</p>
        <h1 className="hero-title">Great Coffee</h1>
        <div className="hero-typing-wrap">
          <span className="hero-typing">For Some Joy ...</span>
        </div>
        <p className="hero-subtext">
          Handcrafted espresso, cold brews and pastries made fresh every morning.
        </p>
        <button className="hero-button" onClick={handlePress}>
          View Menu
        </button>
      </div>
      <div className="hero-image-wrap">
        <img src={heroImage} className="hero-image" alt="Freshly roasted coffee beans" />
      </div>
    </section>
  );
};

export default Home;
