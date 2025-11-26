import React from "react";
import { useNavigate } from "react-router-dom";

export default function FeaturedCard({ listings }) {
    const navigate = useNavigate();
   
  return (
    <div className="listings-grid">
      {listings?.map((listing) => (
        <div key={listing._id} className="listing-card">
          <div className="card-image-wrapper">
            <img
              src={listing?.photos[0]}
              alt={listing.title}
              className="card-image"
            />
            <div className="card-overlay"></div>
          </div>

          <div className="card-content">
            <h3 className="card-title">{listing.listingTitle}</h3>
            <p className="card-description">{listing.description}</p>

            <div className="card-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < Math.floor(listing.rating)
                        ? "star-filled"
                        : "star-empty"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="rating-text">
                {listing.rating || 'N/A'} ({listing.total_review || 'N/A'} reviews)
              </span>
            </div>

            <div className="card-footer">
              <div className="price-section">
                <span className="price-from">From </span>
                <span className="price-amount">${listing.monthlyRent}</span>
                <span className="price-period">/ month</span>
              </div>
              <button onClick={()=>navigate(`/rental-detail/${listing._id}`)} className="view-details-btn">View Details</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
