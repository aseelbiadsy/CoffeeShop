 

import React from 'react';
import './footer.css';
import { FaTwitter, FaFacebook, FaInstagram, FaSkype, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer id="footer">
      <div className="container">
        <h3>Kaffi</h3>
        <p>Et aut eum quis fuga eos sunt ipsa nihil. Labore corporis magni eligendi fuga maxime saepe commodi placeat.</p>
        <div className="social-links">
          <a href="#" className="twitter"><FaTwitter /></a>
          <a href="#" className="facebook"><FaFacebook /></a>
          <a href="#" className="instagram"><FaInstagram /></a>
          <a href="#" className="google-plus"><FaSkype /></a>
          <a href="#" className="linkedin"><FaLinkedin /></a>
        </div>
        <div className="copyright">
          &copy; Copyright <strong><span>Aseel biadsy</span></strong>. All Rights Reserved
        </div>
        <div className="credits">
         </div>
      </div>
    </footer>
  );
};

export default Footer;


 