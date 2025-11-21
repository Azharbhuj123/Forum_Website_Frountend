import React, { useState } from "react";
import FeaturedCard from "./FeaturedCard";
import { useNavigate } from "react-router-dom";

export default function FeaturedListings() {
  const [activeTab, setActiveTab] = useState("All");

  const navigate = useNavigate();

  const tabs = [
    "All",
    "Houses",
    "Rooms",
    "Shared Spaces",
    "Offices",
    "Short-Term",
  ];

  const listings = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=300&fit=crop",
      title: "Professional Office Space",
      description: "Modern coworking space with all amenities included.",
      rating: 4.8,
      reviews: 156,
      price: 450,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=500&h=300&fit=crop",
      title: "Professional Office Space",
      description: "Modern coworking space with all amenities included.",
      rating: 4.8,
      reviews: 156,
      price: 450,
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500&h=300&fit=crop",
      title: "Professional Office Space",
      description: "Modern coworking space with all amenities included.",
      rating: 4.8,
      reviews: 156,
      price: 450,
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=300&fit=crop",
      title: "Professional Office Space",
      description: "Modern coworking space with all amenities included.",
      rating: 4.8,
      reviews: 156,
      price: 450,
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=500&h=300&fit=crop",
      title: "Professional Office Space",
      description: "Modern coworking space with all amenities included.",
      rating: 4.8,
      reviews: 156,
      price: 450,
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&h=300&fit=crop",
      title: "Professional Office Space",
      description: "Modern coworking space with all amenities included.",
      rating: 4.8,
      reviews: 156,
      price: 450,
    },
  ];

  return (
    <div className="featured-container">
      <div className="featured-header">
        <h1 className="featured-title">Featured Listings</h1>
        <p className="featured-subtitle">
          Explore the most popular rentals shared by our community
        </p>
      </div>

      <div className="tabs-container">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "tab-active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <FeaturedCard listings={listings} />

      <div className="explore-all-section">
        <button onClick={()=>navigate('/search-rental')} className="explore-all-btn">
          Explore All Listings
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M3.33331 8H12.6666"
              stroke="white"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8 3.33337L12.6667 8.00004L8 12.6667"
              stroke="white"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
