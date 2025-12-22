import React, { useState } from "react";
import Pending_svg from "../Svg_components/Pending_svg";
import TakeActionReportpopup from "../Popup_components/TakeActionReportpopup";
import ReportDetailspopup from "../Popup_components/ReportDetailspopup";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../queryFunctions/queryFunctions";
import DeleteSure from "../Modals/DeleteSure";
import { showError } from "../Toaster";
import useActionMutation from "../../queryFunctions/useActionMutation";
import { set } from "react-hook-form";

const Reports = () => {
  const [openTakePopup, setOpenTakePopup] = useState(null);
  const [openDetailsPopup, setOpenDetailsPopup] = useState(null);
  const [delete_id, setDelete_id] = useState(null);
  const [diss_miss_id, setDiss_miss_id] = useState(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-report"],
    queryFn: () => fetchData(`/review/flag-review`),
    keepPreviousData: true,
  });

  
  const { triggerMutation, loading } = useActionMutation({
    onSuccessCallback: (res) => {
      if (res?.dismiss) {
       setOpenTakePopup(false);
      refetch(); // Refresh the reports list
      setDelete_id(null);
setDiss_miss_id(null)
        return;
      }
      setOpenTakePopup(false);
      refetch(); // Refresh the reports list
      setDelete_id(null);
    },
    onErrorCallback: (errmsg) => {
      showError(errmsg);
    },
  });

  const onConfirm = async () => {

    let endPoint = diss_miss_id ? `/review/dismiss-flag-review` : `/admin/reviews/${delete_id}`;
    let method = diss_miss_id ? "post": "patch";
    let body = { action: "rejected" };


    if(diss_miss_id){
     body.id = diss_miss_id;
    }
    triggerMutation({
      endPoint,
      method,
      body,
    });
  };

  const handleDismiss = (id) => {
    setOpenDetailsPopup(null);

    setDiss_miss_id(id);
    setOpenTakePopup(true);
  };
const handleTakeAction = (id) => {
    setOpenDetailsPopup(null);

  setDelete_id(id);
  setDiss_miss_id(null); // important
  setOpenTakePopup(true);

};

  return (
    <>
      <div className="Reviews">
        <div className="Main-Reviews-box">
          <div className="Reviews-heading">
            <h1>Pending Reports</h1>
          </div>
          {data?.data?.length === 0 && (
            <div className="no-property">
              <p>No Pending Reports Found!</p>
            </div>
          )}
          <div className="Pending-Reports-box">
            {data?.data?.map((item, index) => (
              <div className="Pending-Reports-list" key={index}>
                <div className="Pending-Reports-title">
                  <span>
                    <Pending_svg />
                    <h2>{item.flagTitle}</h2>
                  </span>

                  <p>{item?.flagMessage}</p>

                  <div className="Pending-Reports-btn-box">
                    <button
                      onClick={() => handleDismiss(item._id)}
                      className="Dismiss"
                    >
                      Dismiss
                    </button>

                    {/* TAKE ACTION BUTTON */}
                    <button
                      className="Take"
                      onClick={() => handleTakeAction(item._id)}
                    >
                      Take Action
                    </button>

                    {/* VIEW DETAILS */}
                    <button onClick={() => setOpenDetailsPopup(item?._id)}>
                      View Details
                    </button>
                  </div>
                </div>

                <div className="Pending-box">
                  <p>Pending</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🔹 TAKE ACTION POPUP */}
      {openTakePopup !== null && (
        // <TakeActionReportpopup closePopup={() => setOpenTakePopup(null)} />
        <DeleteSure
          open={openTakePopup}
          onConfirm={onConfirm}
          onCancel={() => setOpenTakePopup(false)}
          loading={loading}
          isDimiss={diss_miss_id}
        />
      )}

      {/* 🔹 REPORT DETAILS POPUP */}
      {openDetailsPopup !== null && (
        <ReportDetailspopup closePopup={() => setOpenDetailsPopup(null)} openDetailsPopup={openDetailsPopup} 
         onDismiss={handleDismiss}
          onTakeAction={handleTakeAction}/>
      )}
    </>
  );
};

export default Reports;
