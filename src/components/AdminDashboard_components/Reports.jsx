import React, { useState } from "react";
import Remove_svg from "../Svg_components/Remove_svg";
import Approve_Svg from "../Svg_components/Approve_Svg";
import dp from "../../assets/Images/dp.png";
import ViewProfile_svg from "../Svg_components/ViewProfile_svg";
import Actions_svg from "../Svg_components/Actions_svg";
import EditUserProfile_svg from "../Svg_components/EditUserProfile_svg";
import EditPermissions_svg from "../Svg_components/EditPermissions_svg";
import SendEmail_svg from "../Svg_components/SendEmail_svg";
import ResetPassword_svg from "../Svg_components/ResetPassword_svg";
import VerifyUser_svg from "../Svg_components/VerifyUser_svg";
import SuspendAccount_svg from "../Svg_components/SuspendAccount_svg";
import BanUser_svg from "../Svg_components/BanUser_svg";
import DeleteAccount_Svg from "../Svg_components/DeleteAccount_Svg";
import Pending_svg from "../Svg_components/Pending_svg";

const Reports = () => {


  return (
    <>
      <div className="Reviews">
        <div className="Main-Reviews-box">
          <div className="Reviews-heading">
            <h1>Pending Reports</h1>

          </div>

          <div className="Pending-Reports-box">
            <div className="Pending-Reports-list">
              <div className="Pending-Reports-title">
                <span><Pending_svg/><h2>Inappropriate Content Reported</h2></span>
                <p>A user has reported a review for containing inappropriate language.</p>
                <div className="Pending-Reports-btn-box">
                  <button className="Dismiss">Dismiss</button>
                  <button className="Take">Take Action</button>
                  <button>View Details</button>
                </div>
              </div>

              <div className="Pending-box">
                <p>Pending</p>
              </div>
            </div>


            <div className="Pending-Reports-list">
              <div className="Pending-Reports-title">
                <span><Pending_svg/><h2>Inappropriate Content Reported</h2></span>
                <p>A user has reported a review for containing inappropriate language.</p>
                <div className="Pending-Reports-btn-box">
                  <button className="Dismiss">Dismiss</button>
                  <button className="Take">Take Action</button>
                  <button>View Details</button>
                </div>
              </div>

              <div className="Pending-box">
                <p>Pending</p>
              </div>
            </div>


            <div className="Pending-Reports-list">
              <div className="Pending-Reports-title">
                <span><Pending_svg/><h2>Inappropriate Content Reported</h2></span>
                <p>A user has reported a review for containing inappropriate language.</p>
                <div className="Pending-Reports-btn-box">
                  <button className="Dismiss">Dismiss</button>
                  <button className="Take">Take Action</button>
                  <button>View Details</button>
                </div>
              </div>

              <div className="Pending-box">
                <p>Pending</p>
              </div>
            </div>


            <div className="Pending-Reports-list">
              <div className="Pending-Reports-title">
                <span><Pending_svg/><h2>Inappropriate Content Reported</h2></span>
                <p>A user has reported a review for containing inappropriate language.</p>
                <div className="Pending-Reports-btn-box">
                  <button className="Dismiss">Dismiss</button>
                  <button className="Take">Take Action</button>
                  <button>View Details</button>
                </div>
              </div>

              <div className="Pending-box">
                <p>Pending</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
