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
import AddNewUserpopup from "../Popup_components/AddNewUserpopup";


const Users = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const users = [
    { name: "Sarah Mitchell", reviews: 147, joined: "2024-01-15" },
    { name: "Ali Khan", reviews: 100, joined: "2024-02-10" },
    { name: "Fatima Noor", reviews: 250, joined: "2023-11-05" },
    { name: "Bilal Ahmed", reviews: 89, joined: "2024-03-01" },
  ];

  return (
    <>
      <div className="Reviews">
        <div className="Main-Reviews-box">
          <div className="Reviews-heading">
            <h1>User Management</h1>

            <span>
              <button
                className="Add-User"
                onClick={() => setShowPopup(true)}
              >
                Add User
              </button>
            </span>
          </div>

          <div className="Reviews-box">
            {users.map((user, index) => (
              <div className="Reviews-box-list" key={index}>
                <div className="Reviews-box-list-title">
                  <div className="Reviews-box-list-dp">
                    <img src={dp} alt="" />
                    <div className="Reviews-box-list-name">
                      <h2>{user.name}</h2>
                      <span>
                        <p>{user.reviews} reviews</p>
                        <p>Joined {user.joined}</p>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="Management-box-list-btn">
                  <button className="View-btn">
                    <ViewProfile_svg /> View Profile
                  </button>

                  <button
                    onClick={() =>
                      setOpenMenu(openMenu === index ? null : index)
                    }
                  >
                    Actions <Actions_svg />
                  </button>

                  {openMenu === index && (
                    <div className="actions-dropdown">
                      <ul>
                        <li><EditUserProfile_svg /> Edit User Profile</li>
                        <li><EditPermissions_svg /> Edit Permissions</li>
                        <li><SendEmail_svg /> Send Email</li>
                        <li><ResetPassword_svg /> Reset Password</li>
                        <li className="verify"> <VerifyUser_svg /> Verify User</li>
                        <li className="red"><SuspendAccount_svg /> Suspend</li>
                        <li className="red"><BanUser_svg /> Ban</li>
                        <li className="red"><DeleteAccount_Svg /> Delete</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SHOW POPUP */}
{showPopup && (
  <AddNewUserpopup closePopup={() => setShowPopup(false)} />
)}
    </>
  );
};

export default Users;
