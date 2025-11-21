import React, { useState } from "react";

export default function Discussion({ isOpen, setIsOpen }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    description: "",
    selectedTags: [],
  });

  const categories = [
    "General Discussion",
    "Housing",
    "Jobs & Career",
    "Events",
    "Buy & Sell",
    "Services",
    "Community",
  ];

  const availableTags = [
    "Rent",
    "Apartment",
    "Advice",
    "Pricing",
    "Moving",
    "Utilities",
    "Safety",
    "Parking",
  ];

  const handleTagToggle = (tag) => {
    setFormData((prev) => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tag)
        ? prev.selectedTags.filter((t) => t !== tag)
        : [...prev.selectedTags, tag],
    }));
  };

  const handleSubmit = () => {
    console.log("Discussion submitted:", formData);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-backdrop" onClick={() => setIsOpen(false)}></div>

      <div className="discussion-modal">
        <div className="modal-header-section">
          <div className="header-content">
            <h2 className="modal-main-title">Start a Discussion</h2>
            <p className="modal-subtitle">
              Share your experience, ask a question, or start a community
              conversation.
            </p>
          </div>
          <svg
            style={{ cursor: "pointer" }}
            onClick={() => setIsOpen(false)}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M18 6L6 18"
              stroke="#4A5565"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="#4A5565"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          {/* <button className="close-modal-btn" >
       
          </button> */}
        </div>

        <div className="modal-body-content">
          {/* Discussion Title */}
          <div className="form-field-group">
            <label className="field-label">Discussion Title</label>
            <input
              type="text"
              className="text-input-field"
              placeholder="What would you like to discuss?"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {/* Category */}
          <div className="form-field-group">
            <label className="field-label">Category</label>
            <div className="select-wrapper">
              <select
                className="select-input-field"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <svg
                className="select-arrow-icon"
                width="12"
                height="8"
                viewBox="0 0 12 8"
              >
                <path
                  d="M1 1L6 6L11 1"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Location */}
          <div className="form-field-group">
            <label className="field-label">Location (Optional)</label>
            <div className="location-input-wrapper">
              <svg
                className="location-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M16.6666 8.33333C16.6666 12.4942 12.0508 16.8275 10.5008 18.1658C10.3564 18.2744 10.1806 18.3331 9.99998 18.3331C9.81931 18.3331 9.64354 18.2744 9.49915 18.1658C7.94915 16.8275 3.33331 12.4942 3.33331 8.33333C3.33331 6.56522 4.03569 4.86953 5.28593 3.61929C6.53618 2.36905 8.23187 1.66667 9.99998 1.66667C11.7681 1.66667 13.4638 2.36905 14.714 3.61929C15.9643 4.86953 16.6666 6.56522 16.6666 8.33333Z"
                  stroke="#FF7A00"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 10.8333C11.3807 10.8333 12.5 9.71404 12.5 8.33333C12.5 6.95262 11.3807 5.83333 10 5.83333C8.61929 5.83333 7.5 6.95262 7.5 8.33333C7.5 9.71404 8.61929 10.8333 10 10.8333Z"
                  stroke="#FF7A00"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <input
                type="text"
                className="location-input-field"
                placeholder="Add location (optional)"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>
          </div>

          {/* Description */}
          <div className="form-field-group">
            <label className="field-label">Description</label>
            <textarea
              className="textarea-input-field"
              placeholder="Write your question, review, or discussion details..."
              rows="4"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            ></textarea>
          </div>

          {/* Tags */}
          <div className="form-field-group">
            <label className="field-label">Add Tags (Optional)</label>
            <div className="tags-container">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  className={`tag-btn ${
                    formData.selectedTags.includes(tag) ? "tag-selected" : ""
                  }`}
                  onClick={() => handleTagToggle(tag)}
                >
                  <svg
                    className="tag-icon"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M12 7.5L7 12.5L2 7.5V2.5H7L12 7.5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="4.5" cy="4.5" r="0.5" fill="currentColor" />
                  </svg>
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Attachments */}
          <div className="form-field-group">
            <label className="field-label">Attachments (Optional)</label>
            <div className="upload-area">
              <svg
                className="upload-icon"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <rect
                  x="8"
                  y="12"
                  width="24"
                  height="20"
                  rx="2"
                  stroke="#CBD5E0"
                  strokeWidth="2"
                  fill="none"
                />
                <circle cx="15" cy="18" r="2" fill="#CBD5E0" />
                <path
                  d="M8 26L14 20L18 24L26 16L32 22"
                  stroke="#CBD5E0"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="upload-text">+ Add Photos</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer-section">
          <button
            className="cancel-action-btn"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button className="submit-action-btn" onClick={handleSubmit}>
            Start Discussion
          </button>
        </div>
      </div>
    </>
  );
}
