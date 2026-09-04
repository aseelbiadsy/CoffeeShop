import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { AiFillLock } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../../assets/logo.png";
import { BASE_URL } from "../../constans/Urls/Url";
import "./Auth.css";

const LoginScreen = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (email && password) {
      try {
        const response = await axios.get(`${BASE_URL}/users?email=${email}`);

        if (response.status === 200) {
          const userData = response.data;

          if (userData && userData.length > 0) {
            const userWithEmail = userData.find((user) => user.email === email && user.password === password);

            if (userWithEmail) {
              const { _id: userId } = userWithEmail;

              alert("Login successful");

              if (userId) {
                onLogin(userId);
                navigate("/");
              }
              setEmail("");
              setPassword("");
            } else {
              alert("Email or password is incorrect");
            }
          }
        } else {
          alert("Invalid username or password");
        }
      } catch (error) {
        console.error("Error during login", error);
        alert("An error occurred during login");
      }
    } else {
      alert("Please enter both username and password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-image-wrap">
        <img src={Logo} className="auth-logo" alt="CoffeeShop logo" />
      </div>

      <h2 className="auth-title">Login to Your Account</h2>

      <form
        className="auth-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <div className="auth-field">
          <MdEmail size={20} color="gray" />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            placeholder="enter your Email"
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

        <div className="auth-row">
          <span>Keep me logged in</span>
        </div>

        <button type="submit" className="auth-submit">
          Login
        </button>

        <button type="button" className="auth-switch" onClick={() => navigate("/login/Register")}>
          Don't have an account? Sign up
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;
