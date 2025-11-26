import React, { useState } from "react";
import Remove_svg from "../Svg_components/Remove_svg";
import Approve_Svg from "../Svg_components/Approve_Svg";
import dp from "../../assets/Images/dp.png";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../queryFunctions/queryFunctions";
import { showError } from "../Toaster";
import DeleteSure from "../Modals/DeleteSure";
import useActionMutation from "../../queryFunctions/useActionMutation";

const Reviews = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [delete_id, setDelete_id] = useState(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-unapp-review"],
    queryFn: () => fetchData(`/admin/unapp-review`),
    keepPreviousData: true,
  });
  const reviewsData = [
    {
      name: "Sarah Mitchell",
      restaurant: "La Cocina Mexicana",
      text: "Best Properties in Town!",
      date: "2024-11-01",
    },
    {
      name: "John Parker",
      restaurant: "Italiano Pizzeria",
      text: "Amazing Pizza!",
      date: "2024-11-02",
    },
    {
      name: "Emily Rose",
      restaurant: "Sushi House",
      text: "Loved the California rolls",
      date: "2024-11-03",
    },
    {
      name: "Michael Smith",
      restaurant: "Burger Hut",
      text: "Crispy fries & juicy burger!",
      date: "2024-11-04",
    },
    {
      name: "David Wilson",
      restaurant: "Taco Town",
      text: "Fresh & tasty Tacos!",
      date: "2024-11-05",
    },
  ];

  const { triggerMutation, loading } = useActionMutation({
    onSuccessCallback: (res) => {
      refetch(); // Refresh the unapproved reviews list
      setDeleteModal(false)
        setDelete_id(null)
    },
    onErrorCallback: (errmsg) => {
      showError(errmsg);
    },
  });

  const handleAction = async (reviewId, action) => {
    triggerMutation({
      endPoint: `/admin/reviews/${reviewId}`,
      method: "patch",
      body: { action },
    });
  };

  const handleDelete = () => {
    triggerMutation({
      endPoint: `/admin/reviews/${delete_id}`,
      method: "patch",
      body: { action:"rejected" },
    });
  };

  return (
    <>
      <div className="Reviews">
        <div className="Main-Reviews-box">
          <div className="Reviews-heading">
            <h1>Recent Reviews</h1>
            {/* <span>
              <button>Filter</button> <button>Export</button>
            </span> */}
          </div>

          <div className="Reviews-box">
            {data?.length === 0 &&
              <div className="no-property">
              <p>No Recent Reviews Found!</p>
            </div>
            }
            {data?.map((item, index) => (
              <div className="Reviews-box-list" key={index}>
                <div className="Reviews-box-list-title">
                  <div className="Reviews-box-list-dp">
                    <img src={item.user?.profile_img} alt="" />
                    <span>
                      <h2>{item.user?.name}</h2>
                      <h3>reviewed</h3>
                      <h4>{item.property?.listingTitle}</h4>
                    </span>
                  </div>

                  <p>{item.review}</p>

                  <h3>{new Date(item.createdAt).toLocaleDateString()}</h3>
                </div>

                <div className="Reviews-box-list-btn">
                  <button
                    onClick={() => handleAction(item._id, "approved")}
                    disabled={loading}
                  >
                    <Approve_Svg /> Approve
                  </button>

                  <button
                    className="Remove"
                    onClick={() => {
                      setDelete_id(item._id);
                      setDeleteModal(true);
                    }}
                    disabled={loading}
                  >
                    <Remove_svg /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {deleteModal && (
          <DeleteSure
            open={deleteModal}
            onCancel={() => setDeleteModal(false)}
            onConfirm={handleDelete}
            loading={loading}
          />
        )}{" "}
      </div>
    </>
  );
};

export default Reviews;
