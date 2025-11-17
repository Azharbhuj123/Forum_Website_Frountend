import React, { useState } from "react";
import { Link } from "react-router-dom";
import Translate from "../Translate";

const Header = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="container">
        <nav className="nav-1">

          <div className="nav-logo">
          </div>

          <div className="toggle-btn">
            <input id="checkbox" type="checkbox" onClick={toggleMenu} />
            <label class="toggle" for="checkbox">
              <div id="bar1" class="bars"></div>
              <div id="bar2" class="bars"></div>
              <div id="bar3" class="bars"></div>
            </label>
          </div>


          <div className={`nav-box${isMenuOpen ? 'show' : ''}`}>
          </div>

        </nav>
      </div>


    </header>
  );
};

export default Header;
