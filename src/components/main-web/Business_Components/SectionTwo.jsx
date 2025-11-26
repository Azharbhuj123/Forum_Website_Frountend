import React from "react";
import {
  Clock_Svg,
  Location_Svg,
  Phone_Svg,
  Webiste_SVg,
} from "../../Svg_components/Svgs";
import photo from "../../../assets/Images/photo.png";
import Sponser from "../Sponser";
import { useNavigate } from "react-router-dom";

export default function SectionTwo({ rental_data, otherProperties }) {
  const navigate = useNavigate();
  const relatedBusinesses = [
    { name: "The Purple Garden", rating: 5, reviews: 285 },
    { name: "The Purple Garden", rating: 5, reviews: 285 },
    { name: "The Purple Garden", rating: 5, reviews: 285 },
  ];

  return (
    <>
      <div className="business-info-container">
        {/* Business Information Card */}
        <div className="info-card">
          <h3 className="card-title">Business Information</h3>
          {rental_data?.user?.basic_info?.location && (
            <div className="info-item  margin">
              <Location_Svg />

              <div className="info-content">
                <p className="info-text">
                  {rental_data?.user?.basic_info?.location || ""}
                </p>
                <p className="info-label">Get Directions</p>
              </div>
            </div>
          )}
          {rental_data?.user?.basic_info?.phone_number && (
            <div className="info-item">
              <Phone_Svg />

              <div className="info-content">
                <p className="info-text">
                  {rental_data?.user?.phone_number || ""}
                </p>
              </div>
            </div>
          )}

          {rental_data?.user?.basic_info?.website && (

          <div className="info-item">
            <Webiste_SVg />

            <div className="info-content">
              <p className="info-text">
                {rental_data?.user?.basic_info?.website || ""}
              </p>
            </div>
          </div>
          )}


          {/* <div className="info-item">
            <Clock_Svg />
            <div className="info-content">
              <p className="info-text">11:00 AM - 10:00 PM</p>
              <div className="info-content">
                <span className="status-badge">Open Now</span>
              </div>
            </div>
          </div> */}

          <div className="map-section">
            <button className="map-button">
              <span className="map-icon">📍</span>
              <span>Map View</span>
            </button>
          </div>
        </div>

        {/* Related Businesses Card */}
        {otherProperties?.slice(3, 6)?.length > 0 && (
          <div className="info-card">
            <h3 className="card-title">Related Businesses</h3>

            <div className="related-businesses">
              {otherProperties?.slice(3, 6)?.map((data, index) => (
                <div
                  onClick={() => navigate(`/rental-detail/${data?._id}`)}
                  key={index}
                  className="business-item"
                >
                  <div className="business-image">
                    <img src={data?.photos[0]} alt={data.listingTitle} />
                  </div>
                  <div className="business-details">
                    <h4 className="business-name">{data.listingTitle}</h4>
                    <div className="business-rating">
                      <div className="stars1">
                        <span className="star0">★</span>
                        <span className="star0">★</span>
                        <span className="star0">★</span>
                        <span className="star0">★</span>
                        <span className="star0">★</span>
                      </div>
                      <span className="review-count">
                        {data?.total_review} reviews
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <Sponser />
      </div>
    </>
  );
}
