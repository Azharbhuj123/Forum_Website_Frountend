import React, { useEffect } from "react";
import FirstName_svg from "../Svg_components/FirstName_svg";
import MailAddress_svg from "../Svg_components/mailAddress_svg";
import Password_svg from "../Svg_components/Password_svg";
import UserRole_svg from "../Svg_components/UserRole_svg";
import PhoneNumber_svg from "../Svg_components/PhoneNumber_svg";
import Location_svg from "../Svg_components/Location_svg";
import Uplode_svg from "../Svg_components/Uplode_svg";
import dp_img from "../../assets/Images/dp-img.png";
const AddNewUserpopup = () => {
  return (
    <>
      <div className="popup-overly-box">
        <div className="popup-box">
          <div className="popup-heading">
            <span>
              <h2>Add New User</h2>
              <p>Create a new user account with administrative controls</p>
            </span>
          </div>

          <div className="Add-New-User-box">

            <div className="Profile-Photo">
              <div className="Profile-Photo-dp-box">
                <div className="Profile-Photo-img">
                  <img src={dp_img} alt="" />
                </div>
                <div className="Profile-Photo-icon-uplode">
                  <Uplode_svg />
                </div>
              </div>

              <span>
                <h2>Profile Photo</h2>
                <p>Upload a profile picture for the user</p>
              </span>
            </div>
            <div className="Add-New-User-group-box">

              <div className="Add-New-User-group  Haf-width">
                <span><FirstName_svg /><label>Last Name *</label></span>
                <input type="text" />
              </div>

              <div className="Add-New-User-group  Haf-width">
                <span><FirstName_svg /><label>First Name *</label></span>
                <input type="text" />
              </div>

              <div className="Add-New-User-group ">
                <span><FirstName_svg /><label>Username *</label></span>
                <input type="text" />
                <p>This will be displayed publicly</p>
              </div>


              <div className="Add-New-User-group ">
                <span><MailAddress_svg /><label>Email Address *</label></span>
                <input type="email" />
              </div>

              <div className="Add-New-User-group Haf-width ">
                <span><Password_svg /><label>Password *</label></span>
                <input type="password" />
                <p>Minimum 8 characters</p>
              </div>


              <div className="Add-New-User-group Haf-width ">
                <span><Password_svg /><label>Confirm Password *</label></span>
                <input type="password" />
              </div>

              <div className="Add-New-User-group ">
                <span><UserRole_svg /><label>User Role *</label></span>
                <input type="text" />
                <p>Standard user privileges</p>
              </div>


              <div className="Add-New-User-group Haf-width ">
                <span><PhoneNumber_svg /><label>Phone Number</label></span>
                <input type="number" />
              </div>


              <div className="Add-New-User-group Haf-width ">
                <span><Location_svg /><label>Location</label></span>
                <input type="text" />
              </div>


              <div className="Add-New-User-group  ">
                <span><label>Bio</label></span>
                <textarea name="" placeholder="Tell us about this user..."></textarea>
              </div>
            </div>
          </div>

          <div className="popup-btn-box">
            <button className="no-bg"> Cancel</button>
            <button> Create User</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewUserpopup;
