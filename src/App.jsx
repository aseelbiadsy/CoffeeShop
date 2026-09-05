import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AppBar from "./components/AppBar";
import ShoppingCart from "./components/Cart/ShoppingCart";
import Logo from "./components/Logo";
import About from "./components/About/About";
import CategoryScreen from "./components/Categories/CategoryScreen";
import Details from "./components/Categories/Details";
import LoginScreen from "./components/LoginOut/LoginScreen";
import RegisterScreen from "./components/LoginOut/RegisterScreen";
import Footer from "./components/Footer/Footer";
import CheckOut from "./components/CheckOut";
import BestSeller from "./components/BestSeller/BestSeller";

const App = () => {
  const [userId, setUserId] = useState(null);
  const [logout, setLogout] = useState(false);

  const handleLogin = (loggedInUserId) => {
    setUserId(loggedInUserId);
    setLogout(false);
  };

  const handleRegister = (loggedInUserId) => {
    setUserId(loggedInUserId);
    setLogout(false);
  };

  const handleLogout = () => {
    setUserId(null);
    setLogout(true);
  };

  return (
    <Router>
      <AppBar userId={userId} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Logo />} />

        <Route path="/login" element={<LoginScreen onLogin={handleLogin} />} />
        <Route path="/login/Register" element={<RegisterScreen onRegister={handleRegister} />} />

        <Route path="/CategoryScreen" element={<CategoryScreen />} />
        <Route path="/About" element={<About />} />
        <Route path="/BestSeller" element={<BestSeller />} />

        <Route path="/Details/:encodedSubCategory" element={<Details userId={userId} />} />
        <Route path="/ShoppingCart" element={<ShoppingCart userId={userId} logout={logout} />} />
        <Route path="/CheckOut/:cart" element={<CheckOut userId={userId} />} />

        <Route path="/Footer" element={<Footer />} />
      </Routes>
    </Router>
  );
};

export default App;
