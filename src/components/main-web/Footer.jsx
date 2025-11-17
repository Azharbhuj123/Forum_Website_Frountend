import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="Dashboard-container">
        <div className="footer-grid">
          {/* About Column */}
          <div className="footer-column">
            <h3 className="footer-heading">About</h3>
            <ul className="footer-links">
              <li>
                <a href="#">About Company</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Press</a>
              </li>
              <li>
                <a href="#">Investor Relations</a>
              </li>
              <li>
                <a href="#">Trust & Safety</a>
              </li>
              <li>
                <a href="#">Content Guidelines</a>
              </li>
              <li>
                <a href="#">Accessibility Statement</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Ad Choices</a>
              </li>
              <li>
                <a href="#">Your Privacy Choices</a>
              </li>
            </ul>
          </div>

          {/* Discover Column */}
          <div className="footer-column">
            <h3 className="footer-heading">Discover</h3>
            <ul className="footer-links">
              <li>
                <a href="#">Company Project Cost Guides</a>
              </li>
              <li>
                <a href="#">Collections</a>
              </li>
              <li>
                <a href="#">Talk</a>
              </li>
              <li>
                <a href="#">Events</a>
              </li>
              <li>
                <a href="#">Company Blog</a>
              </li>
              <li>
                <a href="#">Support</a>
              </li>
              <li>
                <a href="#">Company Mobile</a>
              </li>
              <li>
                <a href="#">Developers</a>
              </li>
              <li>
                <a href="#">RSS</a>
              </li>
            </ul>
          </div>

          {/* Company for Business Column */}
          <div className="footer-column">
            <h3 className="footer-heading">Company for Business</h3>
            <ul className="footer-links">
              <li>
                <a href="#">Company for Business</a>
              </li>
              <li>
                <a href="#">Business Owner Login</a>
              </li>
              <li>
                <a href="#">Claim your Business Page</a>
              </li>
              <li>
                <a href="#">Advertise on Company</a>
              </li>
              <li>
                <a href="#">Company for Restaurant Owners</a>
              </li>
              <li>
                <a href="#">Company Guest Manager</a>
              </li>
              <li>
                <a href="#">Business Resources</a>
              </li>
              <li>
                <a href="#">Business Support</a>
              </li>
              <li>
                <a href="#">Marketing & Advertising Agencies</a>
              </li>
              <li>
                <a href="#">Company Data for B2B</a>
              </li>
              <li>
                <a href="#">Company Data for B2C</a>
              </li>
              <li>
                <a href="#">Agentic AI</a>
              </li>
            </ul>
          </div>

          {/* Languages & Cities Column */}
          <div className="footer-column">
            <h3 className="footer-heading">Languages</h3>
            <div className="footer-dropdown">
              <button className="dropdown-btn">English</button>
            </div>

            <h3 className="footer-heading footer-heading-cities">Cities</h3>
            <div className="footer-dropdown">
              <button className="dropdown-btn">Explore a City</button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          <p>Copyright © 2004–2025 Your Company Inc.</p>
        </div>
      </div>
    </footer>
  );
}
