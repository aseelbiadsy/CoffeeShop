import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiFillLock } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../../assets/logo.png";
import { BASE_URL } from "../../constans/Urls/Url";
import "./Auth.css";

const RegisterScreen = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const user = { name, email, password };
      const response = await axios.post(`${BASE_URL}/users`, user);

      if (response?.status === 200) {
        const { _id: userId } = response?.data;
        alert("Registration successful. You have been registered successfully");

        if (userId) {
          onRegister(userId);
          navigate("/");
        }
        setName("");
        setEmail("");
        setPassword("");
      } else {
        console.error("Registration failed:", response?.data);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert(error?.response?.data?.message || "Error during registration");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-image-wrap">
        <img src={Logo} className="auth-logo" alt="CoffeeShop logo" />
      </div>

      <h2 className="auth-title">Register to Your Account</h2>

      <form
        className="auth-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
      >
        <div className="auth-field">
          <FaUser size={18} color="gray" />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="auth-input"
            placeholder="enter your Name"
          />
        </div>

        <div className="auth-field">
          <MdEmail size={20} color="gray" />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            placeholder="enter your Email"
            onBlur={() => {
              if (email && !email.includes("@")) {
                alert("Please enter a valid email address");
              }
            }}
          />
        </div>

        <div className="auth-field">
          <AiFillLock size={20} color="gray" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
            placeholder="enter your Password"
          />
        </div>

        <button type="submit" className="auth-submit">
          Register
        </button>

        <button type="button" className="auth-switch" onClick={() => navigate("/login")}>
          Already have an account? Sign In
        </button>
      </form>
    </div>
  );
};

export default RegisterScreen;
