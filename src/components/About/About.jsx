import React from "react";
import aboutImage from "../../../assets/bg1.png";
import "./About.css";

const About = () => {
  return (
    <section className="about">
      <div className="about-row">
        <div className="about-column">
          <h2 className="about-heading">About Us</h2>
          <p className="about-paragraph">
            We moved to Israel from Brazil in 2016. It was a huge step in our lives. We always thought about living
            in Israel but having a family and a business back there made it hard to do it. Everything changed in
            2014. Our daughter was living in Israel for one year in a Jewish youth program and we came to visit her.
            We found out that our connection to this country was even greater than we thought and we started
            thinking seriously about coming.
          </p>
        </div>
        <div className="about-column">
          <img src={aboutImage} className="about-image" alt="Our coffee shop story" />
        </div>
      </div>
    </section>
  );
};

export default About;
