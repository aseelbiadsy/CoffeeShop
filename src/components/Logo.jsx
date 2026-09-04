import React from "react";
import Home from "./home/Home";
import CategoryScreen from "./Categories/CategoryScreen";
import About from "./About/About";
import Footer from "./Footer/Footer";

const Logo = () => {
  return (
    <div>
      <Home />
      <CategoryScreen />
      <About />
      <Footer />
    </div>
  );
};

export default Logo;
