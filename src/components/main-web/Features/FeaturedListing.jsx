import React, { useState } from "react";
import FeaturedCard from "./FeaturedCard";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../../queryFunctions/queryFunctions";

export default function FeaturedListings() {
  const [activeTab, setActiveTab] = useState("All");

const { data, isLoading } = useQuery({
    queryKey: ["user-property",activeTab],
    queryFn: () => fetchData(`/property?page=1&limit=6&status=published&activeTab=${activeTab}`),
    keepPreviousData: true,
  });


  console.log(data?.data,"data");


  const navigate = useNavigate();

  const tabs = [
    "All",
    "Balcony",
    "Parking",
    "Nearby Market",
    "Security Guard",
    "Gym",
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
        {data?.data?.length > 0 ? (
      <FeaturedCard listings={data?.data} />
        ):(
          <div className="no-property">
            <p>No Property Found!</p>
          </div>
        )}

      <div className="explore-all-section">
        <button onClick={()=>navigate('/search-rental')} className="explore-all-btn">
          Explore All Listings
        
        </button>
      </div>
    
   

    </div>
  );
}
