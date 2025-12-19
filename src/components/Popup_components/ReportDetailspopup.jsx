import React, { useEffect, useState } from "react";

import TotalReviews_svg from "../Svg_components/TotalReviews_svg";
import InappropriateContent_svg from "../Svg_components/InappropriateContent_svg";
import Hours_svg from "../Svg_components/Hours_svg";
import FirstName_svg from "../Svg_components/FirstName_svg";
import PendingReports_svg from "../Svg_components/PendingReports_svg";
import Evidence_svg from "../Svg_components/Evidence_svg";
import Close_svg from "../Svg_components/Close_svg";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../queryFunctions/queryFunctions";

const ReportDetailspopup = ({ closePopup, openDetailsPopup }) => {
  const [api_data, set_Api_data] = useState(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-detail", openDetailsPopup],
    queryFn: () => fetchData(`/review/get-id/${openDetailsPopup}`),
    keepPreviousData: true,
    enabled: openDetailsPopup !== null,
  });

  useEffect(() => {
    if (data?.data) {
      set_Api_data(data?.data);
    } else {
      set_Api_data(null);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="popup-overly-box">
        <div className="popup-box">
          <p>Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="popup-overly-box">
      <div className="popup-box">
        <div className="popup-heading">
          <span>
            <h2>Report Details</h2>
            <p>#RPT-{api_data?._id?.slice(0, 6)}</p>
          </span>

          <button>Pending</button>

          <div className="close-btn" onClick={closePopup}>
            <Close_svg />
          </div>
        </div>

        <div className="Report_Details_box">
          <div className="Report-Type-box">
            <div className="Report-Type-list">
              <h3>Report Type</h3>
              <span>
                <InappropriateContent_svg />
                <h4>Inappropriate Content</h4>
              </span>
            </div>

            <div className="Report-Type-list">
              <h3>Priority</h3>
              <h5>High</h5>
            </div>

            <div className="Report-Type-list">
              <h3>Submitted</h3>
              <span>
                <Hours_svg />
                <h4>{api_data?.createdAt?.split("T")[0]}</h4>
              </span>
            </div>

            {/* <div className="Report-Type-list">
              <h3>Related Reports</h3>
              <span><h4>2 similar reports</h4></span>
            </div> */}
          </div>

          <div className="Reported-By">
            <div className="Reported-By-heading">
              <FirstName_svg />
              <h2>Reported By</h2>
            </div>
            {api_data?.flaggedBy?.slice(0, 10)?.map((user, index) => (
              <div className="Reported-By-box" key={index}>
                <div className="Reported-By-box-list">
                  <div className="Reported-By-list-id">
                    <img src={user?.profile_img} alt="" />
                    <span>
                      <h3>{user?.name}</h3>
                      <p>
                        Member since{" "}
                        {new Date(user?.createdAt).toLocaleDateString()}
                      </p>
                    </span>
                  </div>
                  {/* <button>View Profile</button> */}
                </div>
              </div>
            ))}
          </div>

          {/* <div className="ReportInformation">
            <div className="Reported-By-heading">
              <PendingReports_svg />
              <h2>Report Information  </h2>
            </div>

            <div className="ReportInformation-box">
              <span>
                <p>Category</p>
                <h4>Harassment / Abuse</h4>
              </span>

              <span>
                <p>Reason</p>
                <p>Inappropriate Language</p>
              </span>

              <span>
                <p>Description</p>
                <p>
                  This review contains false accusations and inappropriate language.
                  The reviewer is making unverified claims about health violations and
                  using inflammatory language to damage the business reputation.
                </p>
              </span>
            </div>
          </div> */}

          <div className="ReportedContent">
            <div className="Reported-By-heading">
              <TotalReviews_svg />
              <h2>Reported Content </h2>
            </div>

            <div className="ReportedContent-box">
              <div className="ReportedContent-box-head">
                <div className="Review-box">
                  <span>Review</span>
                  <p>by</p>
                  <p>{api_data?.user?.name}</p>
                </div>
                {/* <button>View Original</button> */}
              </div>

              <div className="ReportedContent-note">
                <div className="Content-id">
                  <div className="Content-dp">
                    <img src={api_data?.user?.profile_img} alt="" />
                  </div>
                  <div className="Content-title">
                    <span>
                      <h3>{api_data?.user?.name}</h3>
                      <p>reviewed</p>
                      <h4>{api_data?.property?.listingTitle}</h4>
                    </span>
                    <div className="Content-star">
                      {api_data?.rating > 0 ? (
                        Array.from({ length: api_data.rating }, (_, i) => (
                          <span key={i} className="filled">
                            ★
                          </span>
                        ))
                      ) : (
                        <p>N/A</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <p>
                  {api_data?.review}
                </p>
                <ul>
                  <li>{api_data?.createdAt?.split("T")[0]}</li>
                 
                  <li>{api_data?.reply_reviews?.length} comments</li>
                </ul>
              </div>
            </div>
          </div>

          {/* <div className="PreviousReportsAgainst">
            <div className="Reported-By-heading">
              <Hours_svg />
              <h2>Previous Reports Against This User </h2>
            </div>

            <div className="PreviousReportsAgainst-box">
              <div className="PreviousReportsAgainst-list">
                <span>
                  <h3>Spam content</h3>
                  <p>3 weeks ago</p>
                </span>
                <button>Resolved</button>
              </div>

              <div className="PreviousReportsAgainst-list">
                <span>
                  <h3>Inappropriate language</h3>
                  <p>2 months ago</p>
                </span>
                <button className="Warning">Warning issued</button>
              </div>
            </div>
          </div> */}

          {/* <div className="Evidence_Attachments">
            <div className="Reported-By-heading">
              <Evidence_svg />
              <h2>Evidence & Attachments</h2>
            </div>

            <div className="Evidence_Attachments_box">
              <div className="Evidence_Attachments_list">
                <div className="Evidence_Attachments_icon">
                  <TotalReviews_svg />
                </div>
                <span>
                  <h3>Screenshot of original post</h3>
                  <p>Attached by reporter</p>
                </span>
              </div>

              <div className="Evidence_Attachments_list">
                <div className="Evidence_Attachments_icon">
                  <TotalReviews_svg />
                </div>
                <span>
                  <h3>Previous similar reports</h3>
                  <p>Attached by reporter</p>
                </span>
              </div>
            </div>
          </div> */}
        </div>

        {/* <div className="popup-btn-box">
          <button className="no-bg" onClick={closePopup}>
            Close
          </button>
          <button className="Dismiss_Report_btn">Dismiss Report</button>
          <button>Take Action</button>
        </div> */}
      </div>
    </div>
  );
};

export default ReportDetailspopup;
