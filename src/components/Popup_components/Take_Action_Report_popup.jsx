import React, { useEffect } from "react";
import FirstName_svg from "../Svg_components/FirstName_svg";
import MailAddress_svg from "../Svg_components/mailAddress_svg";
import Password_svg from "../Svg_components/Password_svg";
import UserRole_svg from "../Svg_components/UserRole_svg";
import PhoneNumber_svg from "../Svg_components/PhoneNumber_svg";
import Location_svg from "../Svg_components/Location_svg";
import Uplode_svg from "../Svg_components/Uplode_svg";
import dp_img from "../../assets/Images/dp-img.png";
import Inappropriate_svg from "../Svg_components/Inappropriate_svg";
import DeleteAccount_Svg from "../Svg_components/DeleteAccount_Svg";
import IssueWarning_svg from "../Svg_components/IssueWarning_svg";
import SuspendUser_svg from "../Svg_components/SuspendUser_svg";
import DismissReport_svg from "../Svg_components/DismissReport_svg";
import ActionImpact_svg from "../Svg_components/ActionImpact_svg";
const Take_Action_Report_popup = () => {
  return (
    <>

      <div className="popup-box">
        <div className="popup-heading">
          <span>
            <h2>Take Action on Report</h2>
            <p>Select an appropriate action to resolve this report</p>
          </span>
        </div>

        <div className="Take-Action-Report-box">
          <div className="Inappropriate-Content-box">
            <div className="Inappropriate-Content-icon">
              <Inappropriate_svg />
            </div>
            <div className="Inappropriate-Content-title">
              <span><h2>Inappropriate Content Report</h2> <h6>High Priority</h6></span>
              <p>Report #RPT-2847 • Submitted 2 hours ago</p>
              <h5>Review contains false accusations and inappropriate language</h5>
            </div>
          </div>

          <div className="Select-Action">
            <div className="Select-Action-title">
              <h2>Select Action *</h2>
            </div>
            <div className="Select-Action-box">
              <div className="Select-Action-list">
                <div className="Select-Action-input">
                  <input type="radio" />
                </div>
                <div className="Select-Action-title">
                  <span><DeleteAccount_Svg /><h2>Remove Content</h2> <h3 className="medium">medium</h3></span>
                  <p>Send a formal warning to the user about policy violations</p>
                </div>
              </div>


              <div className="Select-Action-list">
                <div className="Select-Action-input">
                  <input type="radio" />
                </div>
                <div className="Select-Action-title">
                  <span><IssueWarning_svg /><h2>Issue Warning</h2> <h3 className="low">low</h3></span>
                  <p>Send a formal warning to the user about policy violationss</p>
                </div>
              </div>


              <div className="Select-Action-list">
                <div className="Select-Action-input">
                  <input type="radio" />
                </div>
                <div className="Select-Action-title">
                  <span><SuspendUser_svg /><h2>Suspend User Account</h2> <h3 className="high">high</h3></span>
                  <p>Temporarily suspend the user account (7-30 days)</p>
                </div>
              </div>

              <div className="Select-Action-list">
                <div className="Select-Action-input">
                  <input type="radio" />
                </div>
                <div className="Select-Action-title">
                  <span><BanPermanently_svg /><h2>Ban User Permanently</h2> <h3 className="critical">critical</h3></span>
                  <p>Permanently ban the user from the platform</p>
                </div>
              </div>

              <div className="Select-Action-list">
                <div className="Select-Action-input">
                  <input type="radio" />
                </div>
                <div className="Select-Action-title">
                  <span><DismissReport_svg /><h2>Dismiss Report</h2> </span>
                  <p>Mark report as reviewed with no action needed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="Action-Impact-box">
            <span><ActionImpact_svg/> <h2>Action Impact </h2></span>

            <ul>
              <li>• The content will be permanently removed from the platform</li>
              <li>• The author will be notified about the removal</li>
              <li>• This action will be logged in the moderation history</li>
            </ul>
          </div>
        </div>

        <div className="popup-btn-box">
          <button className="no-bg"> Cancel</button>
          <button>Confirm Action</button>
        </div>
      </div>
    </>
  );
};

export default Take_Action_Report_popup;
