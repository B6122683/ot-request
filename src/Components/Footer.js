import React from "react";
import './Footer.css';
var dateobj = new Date();
var B = dateobj.getFullYear();
const Footer = () => (
  
  <div className="footer">
    <p>Copy right &copy; {B} </p>
  </div>
);

export default Footer;