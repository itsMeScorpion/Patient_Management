// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
// import { useTransition, animated } from 'react-spring';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './style.css'; // Import the CSS file for styling

const Header = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{
        background:
          'radial-gradient(circle, rgba(13,56,55,1) 0%, rgba(46,208,165,1) 50%, rgba(0,249,249,1) 100%)',
      }}
    >
      <div class="container-fluid">
        <Link class="navbar-brand" to="/">
          MediSys
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse"
          id="navbarNav"
          style={{ float: 'right' }}
        >
          <ul className="nav-items">
            <li className="nav-item">
              <Link to="/verification">Verification</Link>
            </li>
            <li className="nav-item active">
              <a href="http://localhost:3005/auth/login">Login</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
