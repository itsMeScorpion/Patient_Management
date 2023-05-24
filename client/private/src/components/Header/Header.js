// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
// import { useTransition, animated } from 'react-spring';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';

import '../../styles/Header.css';

const Header = () => {
  const userRole = localStorage.getItem('role');
  const accesstoken = localStorage.getItem('accesstoken');
  const logout = () => {
    localStorage.removeItem('accesstoken');
    localStorage.removeItem('refreshtoken');
    localStorage.removeItem('role');
  };
  return (
    <>
      {accesstoken && (
        <nav
          className="navbar navbar-expand-lg navbar-light"
          style={{
            background:
              'radial-gradient(circle, rgba(13,56,55,1) 0%, rgba(46,208,165,1) 50%, rgba(0,249,249,1) 100%)',
          }}
        >
          <div class="container-fluid">
            <Link class="navbar-brand" to="/dashboard">
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
              {userRole === 'Patient' ? (
                <ul className="nav-items">
                  <li className="nav-item">
                    <Link className="nav-link" to="/consultation">
                      Consultation
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/vaccination">
                      Vaccination
                    </Link>
                  </li>
                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-person-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path
                          fill-rule="evenodd"
                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                        />
                      </svg>
                    </a>
                    <div
                      class="dropdown-menu bg-secondary"
                      aria-labelledby="navbarDropdown"
                    >
                      <Link className="dropdown-item" to={'/profile'}>
                        Profile
                      </Link>
                      <Link className="dropdown-item" to="/change-password">
                        Change Password
                      </Link>
                      <a
                        className="dropdown-item"
                        href="http://localhost:3005/auth/login"
                        onClick={() => logout()}
                      >
                        Logout
                      </a>
                    </div>
                  </li>
                </ul>
              ) : (
                <ul className="nav-items">
                  <li className="nav-item">
                    <Link className="nav-link" to="/feedback">
                      Feedbacks
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/transaction-history">
                      Transactions
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/consultation-certificate">
                      Consultations
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/vaccination-certificate">
                      Vacciantions
                    </Link>
                  </li>
                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-person-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path
                          fill-rule="evenodd"
                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                        />
                      </svg>
                    </a>
                    <div
                      class="dropdown-menu bg-secondary"
                      aria-labelledby="navbarDropdown"
                    >
                      <Link className="dropdown-item" to={'/profile'}>
                        Profile
                      </Link>
                      <Link className="dropdown-item" to="/change-password">
                        Change Password
                      </Link>
                      <a
                        className="dropdown-item"
                        href="http://localhost:3005/auth/login"
                        onClick={() => logout()}
                      >
                        Logout
                      </a>
                    </div>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Header;
