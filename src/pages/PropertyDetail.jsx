import React, { useEffect, useState } from "react";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaTags,
  FaCalendarAlt,
  FaCouch,
  FaWifi,
  FaCar,
  FaCamera,
  FaShieldAlt,
  FaDumbbell,
  FaPaw,
  FaShoppingBag,
  FaSnowflake,
  FaMoneyBillWave,
  FaLock,
  FaTools,
  FaBookmark,
  FaMapMarkerAlt,
  FaShareAlt,
  FaEdit,
} from "react-icons/fa";
import Location_svg from "../components/Svg_components/Location_svg";
import fake1 from "../assets/Images/fake1.png";
import { MdDelete } from "react-icons/md";
import AdminDashboardheader from "../components/AdminDashboard_components/AdminDashboardheader";
import { useNavigate, useParams } from "react-router-dom";
import { fetchData } from "../queryFunctions/queryFunctions";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";
import useActionMutation from "../queryFunctions/useActionMutation";
import DeleteSure from "../components/Modals/DeleteSure";

const PropertyDetail = () => {
  const params = useParams();
  const [mainImage, setMainImage] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-property", params.id],
    queryFn: () => fetchData(`/property/${params.id}`),
    keepPreviousData: true,
  });
  const navigate = useNavigate();

  const property = data?.data;

  useEffect(() => {
    if (property?.photos?.length > 0) {
      setMainImage(property.photos[0]); // first image will be main
    }
  }, [property]);

  const { triggerMutation, loading } = useActionMutation({
    onSuccessCallback: (data) => {
      refetch();
    },
    onErrorCallback: (errmsg) => {
      console.log(errmsg);
      alert(errmsg);
    },
  });
  const handleToogle = () => {
    triggerMutation({
      endPoint: `/property/publish-toogle/${params.id}`,
      method: "put",
    });
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <AdminDashboardheader />

      <div className="property-listing-container Dashboard-container">
        <button className="back-button" onClick={() => navigate('/')}>
          <span className="back-arrow">‹</span> Back
        </button>

        {/* HEADER */}
        <div className="property-header">
          <div className="property-title-section">
            <h1 className="property-title">
              {property?.listingTitle}
              <span className="address-badge">{property?.fullAddress}</span>
            </h1>

            <div className="property-meta">
              Host: User · Created:{" "}
              {new Date(property?.createdAt).toDateString()} · Updated:{" "}
              {new Date(property?.updatedAt).toDateString()}
            </div>
          </div>

          <div className="property-actions">
            <button onClick={() => navigate(`/property-form?id=${params.id}`)} className="action-btn save-btn">
              <FaEdit size={18} />
              Edit
            </button>
            <button onClick={handleToogle} className="action-btn">
              {property?.is_publish ? "Unpublish" : "Publish"}
            </button>
            <button  className="action-btn">
              <MdDelete size={18} />
              Delete
            </button>
          </div>
        </div>

        {/* IMAGE GALLERY */}
        <h2 className="section-title">Listing Overview</h2>

        <div className="image-gallery">
          <div className="main-image">
            <img src={mainImage} alt="Property main view" />
          </div>

          <div className="thumbnail-grid">
            {property?.photos?.map((img, idx) => (
              <div
                key={idx}
                className="thumbnail"
                onClick={() => setMainImage(img)}
              >
                <img src={img} alt={`Property view ${idx}`} />
              </div>
            ))}
          </div>
        </div>

        {/* DESCRIPTION */}
        <h2 className="section-title">Description</h2>
        <p className="description-text">{property?.description}</p>

        {/* LOCATION */}
        <h2 className="section-title">Location</h2>
        <div className="location-section">
          <div className="location-details">
            <p>{property?.fullAddress}</p>
            <p>{property?.country}</p>

            {/* Coordinates */}
            <p>
  Lat: {Array.isArray(property?.property_location?.coordinates) ? property.property_location.coordinates[1] : ""} — Lng:{" "}
  {Array.isArray(property?.property_location?.coordinates) ? property.property_location.coordinates[0] : ""}
</p>

          </div>
        </div>

        <div className="map-placeholder-section">
          <div className="map-icon-container">
            <Location_svg />
          </div>
          <p className="map-placeholder-text">Map preview will appear here</p>
        </div>

        {/* PROPERTY DETAILS */}
        <h2 className="section-title">Property Details</h2>

        <div className="property-details-grid">
          <DetailCard
            icon={<FaBed />}
            title="Bedrooms"
            value={property?.bedrooms}
          />
          <DetailCard
            icon={<FaBath />}
            title="Bathrooms"
            value={property?.bathrooms}
          />
          <DetailCard
            icon={<FaRulerCombined />}
            title="Area Size"
            value={`${property?.areaSize} sqft`}
          />
          <DetailCard
            icon={<FaTags />}
            title="Category"
            value={property?.category}
          />
          <DetailCard
            icon={<FaCalendarAlt />}
            title="Year Built"
            value={property?.yearBuilt}
          />
          {/* <DetailCard
            icon={<FaCouch />}
            title="Furnishing"
            value={property?.furnishing}
          /> */}
        </div>

        {/* AMENITIES */}
        <h2 className="section-title">Features & Amenities</h2>

        <div className="amenities-grid">
          {property?.amenities?.map((item, idx) => (
            <div key={idx} className="amenity-item">
              <div className="amenity-icon">
                <FaWifi size={18} />
              </div>
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* PRICING */}
        <h2 className="section-title">Pricing</h2>

        <div className="pricing-section">
          <PriceCard
            icon={<FaMoneyBillWave />}
            label="Monthly Rent"
            amount={property?.monthlyRent}
          />
          <PriceCard
            icon={<FaLock />}
            label="Security Deposit"
            amount={property?.securityDeposit}
          />
          <PriceCard
            icon={<FaTools />}
            label="Maintenance"
            amount={property?.maintenanceCharges}
          />
        </div>
      </div>
      {deleteModal && (
        <DeleteSure open={deleteModal} onCancel={() => setDeleteModal(false)} />
      )}
    </>
  );
};

// Small reusable components
const DetailCard = ({ icon, title, value }) => (
  <div className="detail-card">
    <div className="detail-icon">{icon}</div>
    <div className="detail-content">
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  </div>
);

const PriceCard = ({ icon, label, amount }) => (
  <div className="price-card">
    <div className="price-icon">{icon}</div>
    <div className="price-label">{label}</div>
    <div className="price-amount">${amount}</div>
  </div>
);

export default PropertyDetail;
