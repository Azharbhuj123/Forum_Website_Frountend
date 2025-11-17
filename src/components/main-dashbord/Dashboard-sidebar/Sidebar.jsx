import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";


const SidebarContainer = styled.div`
  width: 250px;
  background-color: #333;
  color: #fff;
  padding: 20px;
`;

const SidebarItem = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background-color: #444;
  cursor: pointer;
  &:hover {
    background-color: #555;
  }
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowButton(window.innerWidth <= 768);

      if (window.innerWidth <= 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [index, setindex] = useState(0);

  const handleChangeIndex = (p) => {
    if (window.innerWidth <= 768) {
      setindex(p);
      setIsOpen(!isOpen);
    } else {
      setindex(p);
    }
  };

  return (
    <>
      {showButton && (
        <div className="ahti" style={{ position: "fixed", top: "0" }}>

          <input type="checkbox" id="checkbox" onClick={() => {
            toggleSidebar();
          }} />
          <label for="checkbox" class="toggle">
            <div class="bars" id="bar1"></div>
            <div class="bars" id="bar2"></div>
            <div class="bars" id="bar3"></div>
          </label>
        </div>
      )}

      <div
        className="side-bar-container-thiviyo"
        style={{ display: isOpen ? "block" : "none" }}
      >
        <div className="fix-side-box">

          <Link
            to=""
            className="none-list"
            onClick={() => handleChangeIndex(0)}
          >
            <div className="side-bar-item-child">
             {" "}
              Dashboard
            </div>
          </Link>

          <Link
            className="none-list"
            to="customerdetails"
            onClick={() => handleChangeIndex(2)}
          >
            <div className="side-bar-item-child">
              Our Customer
            </div>
          </Link>

          <Link
            className="none-list"
            to="booking"
            onClick={() => handleChangeIndex(3)}
          >
            <div className="side-bar-item-child">
           
              Bookings
            </div>
          </Link>

          <Link
            className="none-list"
            to="destination"
            onClick={() => handleChangeIndex(4)}
          >
            <div className="side-bar-item-child">
              Destination
            </div>
          </Link>

          <Link
            className="none-list"
            to="tour"
            onClick={() => handleChangeIndex(5)}
          >
            <div className="side-bar-item-child">
              Tour
            </div>
          </Link>
          
        </div>
      </div>
    </>
  );
};

export default Sidebar;


