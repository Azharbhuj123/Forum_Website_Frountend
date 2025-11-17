import React from "react";

export default function BusinessCard() {
  return (
    <div className="restaurant-card">
      <div className="restaurant-card-content">
        {/* Image Section */}
        <div className="restaurant-image">
          <img
            src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=400&fit=crop"
            alt="La Cocina Mexicana"
          />
          <button className="favorite-btn">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>

        {/* Info Section */}
        <div className="restaurant-info">
          <h3 className="restaurant-name">La Cocina Mexicana</h3>

          {/* Rating */}
          <div className="restaurant-rating">
            <div className="stars">
              <span className="star filled">★</span>
              <span className="star filled">★</span>
              <span className="star filled">★</span>
              <span className="star filled">★</span>
              <span className="star">★</span>
            </div>
            <span className="rating-text">4.5 (328 reviews)</span>
          </div>

          {/* Description */}
          <p className="restaurant-description">
            Authentic Mexican street-tacos, handmade tortillas, late-night
            dining
          </p>

          {/* Meta Info */}
          <div className="restaurant-meta">
            <span className="category">Mexican Restaurant</span>
            <span className="separator">•</span>
            <span className="price">$$</span>
            <span className="separator">•</span>
            <span className="distance">0.8 mi</span>
            <span className="separator">•</span>
            <span className="status open">Open Now</span>
          </div>

          {/* Address */}
          <div className="restaurant-address">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>123 Main St, Downtow</span>
          </div>

          {/* Action Buttons */}
          <div className="restaurant-actions">
            <button className="action-btn">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              Call
            </button>
            <button className="action-btn">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
              </svg>
              Directions
            </button>
            <button className="action-btn">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M2 12h20"></path>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
