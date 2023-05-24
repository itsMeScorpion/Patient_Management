// src/components/Footer.js
import React from 'react';
import './style.css'; // Import the CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <h3>Contact Information</h3>
          <p>123 Street, City, Country</p>
          <p>Email: info@example.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/services">Services</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Patient Management. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
