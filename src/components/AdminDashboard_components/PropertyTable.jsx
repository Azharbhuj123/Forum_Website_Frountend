import React, { useState } from "react";
import { FaEye, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import fake1 from "../../assets/Images/fake1.png";
import { useNavigate } from "react-router-dom";
import DeleteSure from "../Modals/DeleteSure";
import useActionMutation from "../../queryFunctions/useActionMutation";

const PropertyTable = ({
  properties,
  totalListings,
  currentPage,
  totalPages,
  listingsPerPage,
  onPageChange,
  refetch
}) => {
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Assuming the data in the image: totalListings = 8, currentPage = 1, listingsPerPage = 6
  const startListing = (currentPage - 1) * listingsPerPage + 1;
  const endListing = Math.min(currentPage * listingsPerPage, totalListings);

  // Dynamic text: "Showing 1 to 6 of 8 listings"
  const listingsText = `Showing ${startListing} to ${endListing} of ${totalListings} listings`;

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const { triggerMutation, loading } = useActionMutation({
    onSuccessCallback: (data) => {
      if (data?.delete) {
      refetch();
      setDeleteModal(false)
setDeleteId(null)
        return;
      }
    },
    onErrorCallback: (errmsg) => {
      console.log(errmsg);
      showError(errmsg);
    },
  });

  const handleDelete = () => {
    triggerMutation({
      endPoint: `/property/${deleteId}`,
      method: "delete",
    });
  };

  return (
    <div className="property-table-wrapper">
      <div className="property-data-table">
        {/* Table Header */}
        <div className="table-header-row">
          <div className="table-header-cell">Thumbnail</div>
          <div className="table-header-cell">Title</div>
          <div className="table-header-cell">Category</div>
          <div className="table-header-cell">Location</div>
          <div className="table-header-cell">Price</div>
          <div className="table-header-cell">Status</div>
          <div className="table-header-cell">Actions</div>
        </div>

        {/* Table Body */}
        <div className="table-body-container">
          {properties.map((property) => (
            <div key={property.id} className="table-data-row">
              {/* Thumbnail */}
              <div className="property-thumbnail-cell">
                <img
                  src={property.thumbnail}
                  alt={property.title}
                  className="property-thumbnail-image"
                />
              </div>

              {/* Title */}
              <div className="property-title-cell">{property.title}</div>

              {/* Category */}
              <div>
                <span
                  className="property-category-badge"
                  style={{
                    backgroundColor: property.categoryColor,
                    color: property.categoryTextColor,
                  }}
                >
                  {property.category}
                </span>
              </div>

              {/* Location */}
              <div className="property-location-cell">{property.location}</div>

              {/* Price */}
              <div className="property-price-cell">{property.price}</div>

              {/* Status */}
              <div>
                <span
                  className="property-status-badge"
                  style={{
                    backgroundColor: property.statusColor,
                    color: property.statusTextColor,
                  }}
                >
                  {property.status}
                </span>
              </div>

              {/* Actions */}
              <div className="property-actions-cell">
                <button
                  onClick={() => navigate(`/property-detail/${property.id}`)}
                  className="action-icon-button view-action"
                  title="View"
                >
                  <FaEye size={16} />
                </button>
                {/* <button
                  onClick={() => navigate("/property-form")}
                  className="action-icon-button edit-action"
                  title="Edit"
                >
                  <FaPencilAlt size={14} />
                </button> */}
                <button
                  onClick={() => {setDeleteModal(true),setDeleteId(property.id)}}
                  className="action-icon-button delete-action"
                  title="Delete"
                >
                  <FaTrashAlt size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pagination-container">
        <span className="pagination-text">{listingsText}</span>
        <div className="pagination-controls">
          {/* Previous Button */}
          <button
            className="pagination-button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>

          {/* Page 1 Button (Active) */}
          <button
            className={`pagination-button ${currentPage === 1 ? "active" : ""}`}
            onClick={() => handlePageChange(1)}
          >
            1
          </button>

          {/* Page 2 Button */}
          {totalPages >= 2 && (
            <button
              className={`pagination-button ${
                currentPage === 2 ? "active" : ""
              }`}
              onClick={() => handlePageChange(2)}
            >
              2
            </button>
          )}

          {/* Next Button */}
          <button
            className="pagination-button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
        {deleteModal && (
          <DeleteSure
            open={deleteModal}
            onCancel={() => setDeleteModal(false)}
            onConfirm={handleDelete}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default PropertyTable;
