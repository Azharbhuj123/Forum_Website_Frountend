import React, { useRef, useState } from "react";
import fakeRes from "../../../assets/Images/fakeRes.png";
import photo from "../../../assets/Images/photo.png";
import Star_Svg from "../../Svg_components/Star_Svg";
import Star2 from "../../Svg_components/Star2";
import Camera_svg from "../../Svg_components/Camera_svg";
import {
  Chat2_svg,
  Green_Check,
  Save_svgs,
  Share_svg,
} from "../../Svg_components/Svgs";
import CommentsSection from "./Comments";
import { useNavigate } from "react-router-dom";
import SectionTwo from "./SectionTwo";

export default function SectionOne({ rental_data, otherProperties }) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const navigate = useNavigate();
  const photos = rental_data?.photos;

  const dishes = [
    { name: "Carne Asada Tacos", reviews: 127 },
    { name: "Salsa Verde", reviews: 89 },
    { name: "Churros", reviews: 85 },
  ];

  const amenities = [
    "Outdoor Seating",
    "Takeout",
    "Delivery",
    "Accepts Credit Cards",
    "Free WiFi",
    "Parking Available",
  ];

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };
  const sectionTwoRef = useRef(null);

  const gotoReview = () => {
    // Scroll to the div smoothly
    sectionTwoRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="restaurant-container">
        {/* Back Button */}
        <button className="back-button" onClick={() => window.history.back()}>
          <span className="back-arrow">‹</span> Back
        </button>

        {/* Hero Section */}

        <div className="hero-section">
          <div className="hero-image">
            <img src={rental_data?.photos[0]} alt="Restaurant interior" />
          </div>

          <div className="restaurant-info1">
            <h1 className="restaurant-name1">{rental_data?.listingTitle}</h1>

            <div className="rating-section">
              <div className="stars0">
                <span className="star1 filled">★</span>
                <span className="star1 filled">★</span>
                <span className="star1 filled">★</span>
                <span className="star1 filled">★</span>
                <span className="star1 half">★</span>
              </div>
              <span className="rating-text">
                {rental_data?.rating || "N/A"}
              </span>
              <span className="reviews-count">
                ({rental_data?.total_review || "N/A"} reviews)
              </span>
            </div>

            <div className="restaurant-type">
              <span className="type-text">{rental_data?.category}</span>
              <span className="badge-claimed">Claimed</span>
            </div>

            <div className="action-buttons">
              <button onClick={gotoReview} className="btn btn-primary">
                <span className="btn-icon">
                  <Star2 />
                </span>
                Write a Review
              </button>
              <button className="btn btn-tertiary">
                <span className="btn-icon">
                  <Share_svg />
                </span>
                Share
              </button>
              {/* <button className="btn btn-secondary">
                <span className="btn-icon">
                  <Camera_svg />
                </span>
                Add Photo
              </button> */}
              <button className="btn btn-secondary">
                <Save_svgs />
                Save
              </button>
            </div>

            <div className="secondary-buttons">
              <button
                className="btn btn-tertiary"
                onClick={() => navigate("/chat")}
              >
                <span className="btn-icon">
                  <Chat2_svg />
                </span>
                Message
              </button>
            </div>
          </div>
        </div>
        <div className="res786Done">
          <SectionTwo />
        </div>
        {/* Photos Section */}
        <div className="photos-section">
          <h2 className="section-title">Photos</h2>
          <div className="photo-carousel">
            <button className="carousel-btn prev-btn" onClick={prevPhoto}>
              ‹
            </button>
            <div className="photo-container">
              <img
                src={photos[currentPhotoIndex]}
                alt="Food"
                className="carousel-image"
              />
            </div>
            <button className="carousel-btn next-btn" onClick={nextPhoto}>
              ›
            </button>
          </div>
        </div>

        {/* Popular Dishes Section */}
        {otherProperties?.length > 0&& (
          
        <div className="dishes-section">
          <h2 className="section-title">Popular Properties</h2>
          <div className="dishes-grid">
            {otherProperties?.slice(0, 3)?.map((data, index) => (
              <div
                onClick={() => navigate(`/rental-detail/${data?._id}`)}
                key={index}
                className="dish-card"
              >
                <div className="dish-image">
                  <img src={data?.photos[0]} alt={data.listingTitle} />
                </div>
                <div className="dish-info">
                  <h3 className="dish-name">{data.listingTitle}</h3>
                  <p className="dish-reviews">
                    Mentioned in {data.total_review} reviews
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        )}


        <div className="dishes-section ameinities-section">
          <h2 className="section-title">Amenties</h2>
          <div className="amenities-grid">
            {rental_data?.amenities.map((item, index) => (
              <div key={index} className="amenities-card">
                <div className="amenities-info">
                  <h3 className="amenities-name">
                    <Green_Check /> {item}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <CommentsSection sectionTwoRef={sectionTwoRef} />
      </div>
    </>
  );
}
