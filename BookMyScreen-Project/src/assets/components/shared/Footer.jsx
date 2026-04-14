import React from "react";
import mainLogo from "/src/images/main-icon.png";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaYoutube,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

// Footer component
const Footer = () => {
  return (
    <footer className="footer">
       {/* Main footer content */}
      <div className="footer-content">
         {/* Logo section */}
        <div className="footer-logo-wrapper">
          <img
            src={mainLogo}
            alt="BookMyScreen Logo"
            className="footer-logo"
          />
        </div>

 {/* Social media icons */}
        <div className="social-icons">
          <FaFacebook className="social-icon" />
          <FaTwitter className="social-icon" />
          <FaInstagram className="social-icon" />
          <FaYoutube className="social-icon" />
          <FaPinterest className="social-icon" />
          <FaLinkedin className="social-icon" />
        </div>

 {/* Copyright text */}
        <p className="footer-text">
          © {new Date().getFullYear()} BookMyScreen Pvt Ltd. All Rights Reserved.
        </p>
{/* Disclaimer / note */}
        <p className="footer-text footer-note">
          The content and images used on this site are copyright protected and
          copyrights vest with the respective owners. The usage of the content
          is intended to promote the works and no endorsement is implied.
        </p>
      </div>
    </footer>
  );
};

export default Footer;