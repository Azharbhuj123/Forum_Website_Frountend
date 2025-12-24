import React from "react";
import logo from "../../assets/Images/logo.png";
import { Link } from "react-router-dom";

export default function Footer() {
  const userData = JSON.parse(localStorage.getItem("userData"));

  return (
    <footer className="footer">
      <div className="Dashboard-container">
        <div className="main-footer">
          {/* Logo - Replace src with your image path */}
          <div className="footer-logo">
            <img src={logo} alt="Colorlib.com" />
          </div>

          {/* Navigation Links */}
          <nav className="footer-nav">
            <Link to="/">Home</Link>
            <Link to="/search-rental">Featured Listings</Link>
            <Link to="/discussions">Discussions</Link>
            <Link to="/chat">Chats</Link>
            {userData ? (
              <Link to="/profile">Profile</Link>
            ) : (
              <Link to="/register">Create Account</Link>
            )}
          </nav>

          {/* Social Media Icons */}

          {/* Copyright */}
          <div className="footer-copyright">
            <p>Copyright ©2024 All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
