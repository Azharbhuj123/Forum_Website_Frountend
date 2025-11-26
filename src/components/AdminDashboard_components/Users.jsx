import React, { useEffect, useState } from "react";
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
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../queryFunctions/queryFunctions";
import useActionMutation from "../../queryFunctions/useActionMutation";
import { showSuccess } from "../Toaster";
import DeleteSure from "../Modals/DeleteSure";

const Users = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [api_data, setApiData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [delete_id, setDelete_id] = useState(null);
  const [edit_id, setEdit_id] = useState(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-user-view"],
    queryFn: () => fetchData(`/admin/user`),
    keepPreviousData: true,
  });

  useEffect(() => {
    if (data?.data) {
      setApiData(data?.data);
    } else {
      setApiData([]);
    }
  }, [data?.data]);

  const users = [
    { name: "Sarah Mitchell", reviews: 147, joined: "2024-01-15" },
    { name: "Ali Khan", reviews: 100, joined: "2024-02-10" },
    { name: "Fatima Noor", reviews: 250, joined: "2023-11-05" },
    { name: "Bilal Ahmed", reviews: 89, joined: "2024-03-01" },
  ];

  const { triggerMutation, loading } = useActionMutation({
    onSuccessCallback: (res) => {
      showSuccess(res?.message);
      const updatedList = api_data?.map((item) =>
        item?._id?.toString() === res?.data?._id?.toString()
          ? { ...item, is_suspend: res?.data?.is_suspend }
          : item
      );

      setDeleteModal(false);
      setDelete_id(null);
      refetch();
      setApiData(updatedList);
    },
    onErrorCallback: (errmsg) => {
      showError(errmsg);
    },
  });

  const handleSuspend = (id) => {
    triggerMutation({
      endPoint: `/admin/users/${id}/suspend`,
      method: "patch",
    });
  };

  const handleDelete = () => {
    triggerMutation({
      endPoint: `/admin/users/${delete_id}`,
      method: "delete",
    });
  };

  return (
    <>
      <div className="Reviews">
        <div className="Main-Reviews-box">
          <div className="Reviews-heading">
            <h1>User Management</h1>

            <span>
              <button className="Add-User" onClick={() => {setEdit_id(null);setShowPopup(true)}}>
                Add User
              </button>
            </span>
          </div>

          <div className="Reviews-box">
            {api_data?.map((user, index) => (
              <div className="Reviews-box-list" key={index}>
                <div className="Reviews-box-list-title">
                  <div className="Reviews-box-list-dp">
                    <img src={user.profile_img} alt={user.name} />

                    <div className="Reviews-box-list-name">
                      <h2>{user.name || "Unknown User"}</h2>

                      <span>
                        <p>{user.approvedReviewsCount} reviews</p>
                        <p>
                          Joined{" "}
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="Management-box-list-btn">
                  <button
                    onClick={() => {
                      setShowPopup(true);
                      setEdit_id(user?._id);
                    }}
                    className="View-btn"
                  >
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
                        <li>
                          <SendEmail_svg /> Send Email
                        </li>

                        <li
                          onClick={() => handleSuspend(user?._id)}
                          className="red"
                        >
                          <SuspendAccount_svg />{" "}
                          {user?.is_suspend ? "Un Suspend" : "Suspend"}
                        </li>

                        <li
                          className="red"
                          onClick={() => {
                            setDelete_id(user?._id);
                            setDeleteModal(true);
                          }}
                        >
                          <DeleteAccount_Svg /> Delete
                        </li>
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
        <AddNewUserpopup
          refetch={refetch}
          closePopup={(() => setShowPopup(false) )}
          edit_id={edit_id}
        />
      )}
      {deleteModal && (
        <DeleteSure
          open={deleteModal}
          onCancel={() => setDeleteModal(false)}
          onConfirm={handleDelete}
          loading={loading}
        />
      )}{" "}
    </>
  );
};

export default Users;
