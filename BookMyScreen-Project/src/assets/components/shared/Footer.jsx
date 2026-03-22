import React from "react";
import { 
  FaFacebook, 
  FaInstagram, 
  FaPinterest, 
  FaYoutube, 
  FaLinkedin,
  FaTwitter
} from "react-icons/fa";
import mainLogo from "../../images/main-icon.png";

const Footer = () => {
  return (
    <footer className="bg-[#2b2b2b] text-gray-400 text-sm">
       
      <div className="border-t border-gray-600 w-full">
        
        {/* Logo */}
        <div className="flex flex-col items-center py-1cd">
          <img src={mainLogo} alt="BookMyScreen Logo" className="w-28 mb-4"/>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 mb-4">
          <FaFacebook className="w-8 h-8 p-2 rounded-full bg-gray-700 text-white" />
          <FaTwitter className="w-8 h-8 p-2 rounded-full bg-gray-700 text-white" />
          <FaInstagram className="w-8 h-8 p-2 rounded-full bg-gray-700 text-white" />
          <FaYoutube className="w-8 h-8 p-2 rounded-full bg-gray-700 text-white" />
          <FaPinterest className="w-8 h-8 p-2 rounded-full bg-gray-700 text-white" />
          <FaLinkedin className="w-8 h-8 p-2 rounded-full bg-gray-700 text-white" />
        </div>

        {/* Copyright */}
        <p className="text-center text-xs px-4 max-w-4xl mx-auto">
          © {new Date().getFullYear()} BookMyScreen Pvt Ltd. All Rights Reserved.
        </p>

        <p className="text-center text-xs px-4 max-w-4xl mx-auto mt-2 pb-6">
          The content and images used on this site are copyright protected and 
          copyrights vest with the respective owners. The usage of the content 
          is intended to promote the works and no endorsement is implied.
        </p>

      </div>
    </footer>
  );
};

export default Footer;