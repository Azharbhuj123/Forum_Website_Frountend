import React, { useState, useCallback } from "react";
import { Reply_Svg, Thumb_Svg } from "../../Svg_components/Svgs";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../../queryFunctions/queryFunctions";
import TabNavigation from "../common/TabNavigation";
import { Skeleton } from "antd";
import FeaturedCard from "../Features/FeaturedCard";
import Listings from "../../AdminDashboard_components/Listings";

const TABS = [
  { id: "reviews", label: "Reviews" },
  { id: "listing", label: "Listing" },
  { id: "saved", label: "Saved" },
  { id: "photos", label: "Photos" },
];

export default function MiddleSection() {
  const [activeTab, setActiveTab] = useState("reviews");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [limit, setLimit] = useState(5);

  const { data: reviewsData, isLoading: reviewsLoading } = useQuery({
    queryKey: ["my-reviews", limit],
    queryFn: () =>
      fetchData(`/review/${userData?._id}?forme=true&limit=${limit}`),
    keepPreviousData: true,
    enabled: activeTab === "reviews",
  });

  const { data: photosData, isLoading: photosLoading } = useQuery({
    queryKey: ["my-photos", limit],
    queryFn: () => fetchData(`/property/property-images?limit=${limit}`),
    keepPreviousData: true,
    enabled: activeTab === "photos",
  });

  const { data: savedData, isLoading: savedLoading } = useQuery({
    queryKey: ["my-saved", limit],
    queryFn: () => fetchData(`/property/property-saved?limit=${limit}`),
    keepPreviousData: true,
    enabled: activeTab === "saved",
  });

  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
  }, []);

  return (
    <div className="smitchell-review-component">
      <TabNavigation
        activeTab={activeTab}
        onTabChange={handleTabChange}
        tabs={TABS}
      />

      {activeTab === "reviews" && (
        <div className="smitchell-review-list">
          {reviewsData?.data?.map((review) => (
            <div key={review._id} className="smitchell-review-item">
              {/* Place / Property Name */}
              <h3 className="smitchell-review-place-name">
                {review?.property?.listingTitle || "Property Name"}{" "}
                {/* you may need to fetch or map propertyName */}
              </h3>

              {/* Rating & Date */}
              <div className="smitchell-review-rating">
                <span className="smitchell-review-stars">
                  {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
                </span>
                <span className="smitchell-review-date">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* Review Body */}
              <p className="smitchell-review-body">{review.review}</p>

              {/* Actions: Likes & Replies */}
              <div className="smitchell-review-actions">
                <span className="smitchell-review-stat">
                  <Thumb_Svg /> {review.likesCount || 0}
                </span>
                <span className="smitchell-review-stat">
                  <Reply_Svg /> {review.reply_reviews?.length || 0}
                </span>
              </div>
            </div>
          ))}

          {reviewsData?.totalCount > limit && (
            <div className="load-more">
              <button onClick={() => setLimit(limit + 5)}>Load More</button>
            </div>
          )}

          {/* Show loading / empty state */}
          {reviewsLoading && (
            <>
              <Skeleton active paragraph={{ rows: 0 }} />
              <Skeleton active paragraph={{ rows: 0 }} />
              <Skeleton active paragraph={{ rows: 0 }} />
            </>
          )}
          {!reviewsLoading && reviewsData?.data?.length === 0 && (
            <div className="no-property">
              <p>No Reviews Found!</p>
            </div>
          )}
        </div>
      )}
      {activeTab === "photos" && (
        <div>
          {photosLoading && (
            <>
              <Skeleton active paragraph={{ rows: 0 }} />
              <Skeleton active paragraph={{ rows: 0 }} />
              <Skeleton active paragraph={{ rows: 0 }} />
            </>
          )}

          {!photosLoading && photosData?.data?.length === 0 && (
            <div className="no-property">
              <p>No Photos Found!</p>
            </div>
          )}

          {!photosLoading && photosData?.photos?.length > 0 && (
            <div className="photos-grid">
              {photosData.photos?.map((photo, index) => (
                <div key={index} className="photo-item">
                  <img src={photo} alt={`Photo ${index + 1}`} />
                </div>
              ))}
            </div>
          )}

          {photosData?.totalCount > limit && (
            <div className="load-more">
              <button onClick={() => setLimit(limit + 5)}>Load More</button>
            </div>
          )}
        </div>
      )}
      {activeTab === "saved" && (
        <div>
          {savedLoading && (
            <>
              <Skeleton active paragraph={{ rows: 0 }} />
              <Skeleton active paragraph={{ rows: 0 }} />
              <Skeleton active paragraph={{ rows: 0 }} />
            </>
          )}

          {!savedLoading && savedData?.data?.length === 0 && (
            <div className="no-property">
              <p>No Saved Listing Found!</p>
            </div>
          )}

          {!savedLoading && savedData?.data?.length > 0 && (
            <FeaturedCard listings={savedData?.data} />
          )}

          {savedData?.totalCount > limit && (
            <div className="load-more">
              <button onClick={() => setLimit(limit + 5)}>Load More</button>
            </div>
          )}
        </div>
      )}

      {activeTab === "listing" && (
        <div>
          <Listings forme={userData?._id}/>
        </div>
      )}
    </div>
  );
}
