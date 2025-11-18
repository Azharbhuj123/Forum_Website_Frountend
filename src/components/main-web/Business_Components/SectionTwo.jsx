import React from "react";
import {
  Clock_Svg,
  Location_Svg,
  Phone_Svg,
  Webiste_SVg,
} from "../../Svg_components/Svgs";
import photo from "../../../assets/Images/photo.png";
import Sponser from "../Sponser";

export default function SectionTwo() {
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

          <div className="info-item  margin">
            <Location_Svg />

            <div className="info-content">
              <p className="info-text">123 Main St, Downtown</p>
              <p className="info-label">Get Directions</p>
            </div>
          </div>

          <div className="info-item">
            <Phone_Svg />

            <div className="info-content">
              <p className="info-text">(555) 123-4567</p>
            </div>
          </div>

          <div className="info-item">
            <Webiste_SVg />

            <div className="info-content">
              <p className="info-text">www.lacocinsmexicana.com</p>
            </div>
          </div>

          <div className="info-item">
            <Clock_Svg />
            <div className="info-content">
              <p className="info-text">11:00 AM - 10:00 PM</p>
              <div className="info-content">
                <span className="status-badge">Open Now</span>
              </div>
            </div>
          </div>

          <div className="map-section">
            <button className="map-button">
              <span className="map-icon">📍</span>
              <span>Map View</span>
            </button>
          </div>
        </div>

        {/* Related Businesses Card */}
        <div className="info-card">
          <h3 className="card-title">Related Businesses</h3>

          <div className="related-businesses">
            {relatedBusinesses.map((business, index) => (
              <div key={index} className="business-item">
                <div className="business-image">
                  <img src={photo} alt={business.name} />
                </div>
                <div className="business-details">
                  <h4 className="business-name">{business.name}</h4>
                  <div className="business-rating">
                    <div className="stars1">
                      <span className="star0">★</span>
                      <span className="star0">★</span>
                      <span className="star0">★</span>
                      <span className="star0">★</span>
                      <span className="star0">★</span>
                    </div>
                    <span className="review-count">
                      {business.reviews} reviews
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Sponser/>
      </div>
    </>
  );
}
