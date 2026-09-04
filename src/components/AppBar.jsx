import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaRegUser, FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../constans/Urls/Url";
import Colors from "../constans/Colors/Colors";
import logo from "../../assets/logo.png";
import "./AppBar.css";

const AppBar = ({ userId, onLogout }) => {
  const location = useLocation();
  const [logout, setLogout] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserById = async () => {
      if (!userId) {
        setUser(null);
        return;
      }
      try {
        const response = await axios.get(`${BASE_URL}/users?_id=${userId}`);

        if (response?.status === 200 && response.data.length > 0) {
          const fetchedUser = response.data;
          const u1 = fetchedUser.find((user) => user._id === userId);
          setUser(u1);
        } else {
          console.error("Error fetching user details:", response?.data);
        }
      } catch (error) {
        console.error("Error during request:", error);
      }
    };

    fetchUserById();
  }, [userId]);

  const handleLogout = () => {
    onLogout(null);
    setUser(null);
    setLogout(1);
  };

  return (
    <div className="appbar" style={{ backgroundColor: Colors.NavBar }}>
      <Link to="/">
        <img src={logo} className="appbar-logo" alt="CoffeeShop logo" />
      </Link>

      <nav className="appbar-nav">
        <Link to="/" className={location.pathname === "/" ? "appbar-link active" : "appbar-link"}>
          HOME
        </Link>
        <Link
          to="/CategoryScreen"
          className={location.pathname === "/CategoryScreen" ? "appbar-link active" : "appbar-link"}
        >
          CATEGORY
        </Link>
        <Link to="/About" className={location.pathname === "/About" ? "appbar-link active" : "appbar-link"}>
          ABOUT
        </Link>
      </nav>

      <div className="appbar-actions">
        {user ? (
          <>
            <span className="appbar-username">Hello {user?.name || "User"},</span>
            {logout === 0 ? (
              <button className="appbar-logout" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link to="/login">
                <FaRegUser className="appbar-icon" size={22} color={Colors.Icon} />
              </Link>
            )}
          </>
        ) : (
          <>
            <span className="appbar-username">Hello User,</span>
            <Link to="/login">
              <FaRegUser className="appbar-icon" size={22} color={Colors.Icon} />
            </Link>
          </>
        )}

        <Link to="/ShoppingCart">
          <FaShoppingCart className="appbar-icon" size={22} color={Colors.Icon} />
        </Link>
      </div>
    </div>
  );
};

export default AppBar;
