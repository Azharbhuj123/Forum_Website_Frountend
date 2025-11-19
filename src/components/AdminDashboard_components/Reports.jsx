import React, { useState } from "react";
import Pending_svg from "../Svg_components/Pending_svg";
import TakeActionReportpopup from "../Popup_components/TakeActionReportpopup";
import ReportDetailspopup from "../Popup_components/ReportDetailspopup";


const Reports = () => {
  const [openTakePopup, setOpenTakePopup] = useState(null);
  const [openDetailsPopup, setOpenDetailsPopup] = useState(null);

  const reports = [
    {
      title: "Inappropriate Content Reported",
      desc: "A user has reported a review for containing inappropriate language."
    },
    {
      title: "Spam Review Detected",
      desc: "This review appears to be automated spam."
    },
    {
      title: "Fake Information",
      desc: "User claims the review contains false information."
    },
    {
      title: "Harassment Reported",
      desc: "Contains personal attacks on another user."
    }
  ];

  return (
    <>
      <div className="Reviews">
        <div className="Main-Reviews-box">
          <div className="Reviews-heading">
            <h1>Pending Reports</h1>
          </div>

          <div className="Pending-Reports-box">
            {reports.map((item, index) => (
              <div className="Pending-Reports-list" key={index}>
                <div className="Pending-Reports-title">
                  <span>
                    <Pending_svg />
                    <h2>{item.title}</h2>
                  </span>

                  <p>{item.desc}</p>

                  <div className="Pending-Reports-btn-box">
                    <button className="Dismiss">Dismiss</button>

                    {/* TAKE ACTION BUTTON */}
                    <button
                      className="Take"
                      onClick={() => setOpenTakePopup(index)}
                    >
                      Take Action
                    </button>

                    {/* VIEW DETAILS */}
                    <button
                      onClick={() => setOpenDetailsPopup(index)}
                    >
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
        <TakeActionReportpopup closePopup={() => setOpenTakePopup(null)} />
      )}

      {/* 🔹 REPORT DETAILS POPUP */}
      {openDetailsPopup !== null && (
        <ReportDetailspopup closePopup={() => setOpenDetailsPopup(null)} />
      )}
    </>
  );
};

export default Reports;
